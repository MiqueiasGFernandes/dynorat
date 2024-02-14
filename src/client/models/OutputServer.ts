import { readFileSync, writeFileSync } from 'fs'
import { createHash, randomUUID } from 'node:crypto'
import path from 'node:path'
import { Column, Entity, PrimaryColumn, Repository } from 'typeorm'
import { Commander } from './CommandAsPromise.util'
import { EventListener } from '../event/EventListener'

const BUNDLE_SERVER_COMMAND = 'npm run bundle:server'
const SERVER_TEMPLATE_DIRECTORY = path.resolve(__dirname, '..', '..', 'server-template')

interface ConnectionOptions {
  port: number
  host: string
}

@Entity('output_servers')
export class OutputServer {
  private readonly _osCompileMap: Record<string, string> = {
    windows: 'node18-win',
    linux: 'node18-linux'
  }

  @PrimaryColumn({ name: 'id', type: 'varchar' })
  private _id!: string

  @Column({ unique: true, name: 'hash', type: 'varchar' })
  private _hash!: string

  @Column({ name: 'port', type: 'int' })
  private _port!: number

  @Column({ name: 'host', type: 'varchar' })
  private _host!: string

  constructor (
    public outputPath: string = '~/server',
    public connection: ConnectionOptions,
    public os: string[],
    private readonly _serverRepository: Repository<OutputServer>

  ) {
    if (connection) {
      this.setConnection(connection)
    }
    this.setId()
  }

  writeSettingsAtTemporarlyDotEnv (): void {
    const dotEnvLines = [
            `HOST=${this.connection.host}`,
            `PORT=${this.connection.port}`
    ]

    const dotenvContent = dotEnvLines.join('\n')

    writeFileSync(path.resolve(`${SERVER_TEMPLATE_DIRECTORY}`, '.env'), dotenvContent, 'utf-8')
    console.log('Writing preferences into output server...')
  }

  compileServer (): void {
    console.log('Bundling server code into single file...')

    Commander.command(BUNDLE_SERVER_COMMAND)

    console.log('Compiling server into executable file...')

    const os = this.os.map((item) => this._osCompileMap[item]).join(',')

    Commander.command(`pkg ./src/server-template/build/server/index.js -t ${os} -o ${this.outputPath}`)

    console.log('Output server successfully generated!')

    EventListener.getEventEmitter().emit('GO_TO_MAIN_MENU')
  }

  private setConnection (connection: ConnectionOptions): void {
    this._host = connection.host
    this._port = connection.port
  }

  private setId (): void {
    this._id = randomUUID()
  }

  private setHash (file: Buffer): void {
    const hash = createHash('sha256')

    hash.update(file)

    this._hash = hash.digest('hex')
  }
}
