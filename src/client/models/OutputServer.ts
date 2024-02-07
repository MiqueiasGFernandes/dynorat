import { readFileSync, writeFileSync } from 'fs'
import { createHash, randomUUID } from 'node:crypto'
import path from 'node:path'
import { Column, Entity, PrimaryColumn, Repository } from 'typeorm'
import { Commander } from './CommandAsPromise.util'

const BUNDLE_SERVER_COMMAND = 'npm run bundle:server'
const SERVER_TEMPLATE_DIRECTORY = path.resolve(__dirname, '..', '..', 'server-template')

interface ConnectionOptions {
  port: number
  host: string
}

@Entity('output_servers')
export class OutputServer {
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
    public connection: ConnectionOptions = null,
    private readonly _serverRepository: Repository<OutputServer>

  ) {
    this.setConnection(connection)
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

    Commander.command(`pkg ./src/server-template/build/server/index.js -o ${this.outputPath}`)

    console.log('Generating file hash...')

    const fileBuffer = readFileSync(this.outputPath)

    this.setHash(fileBuffer)

    console.log('Saving the file hash into history...')

    console.log('Output server successfully generated!')
  }

  private setConnection (connection?: ConnectionOptions | null): void {
    if (connection !== null) {
      this._host = connection.host
      this._port = connection.port
    }
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
