import path from 'node:path'
import { createHash, randomUUID } from 'node:crypto'
import { writeFile, readFile } from 'fs/promises'
import { CommandAsPromiseUtil } from './CommandAsPromise.util'
import { Column, Entity, PrimaryColumn } from 'typeorm'

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
    public connection: ConnectionOptions = null
  ) {
    this.setConnection(connection)
    this.setId()
  }

  async writeSettingsAtTemporarlyDotEnv (): Promise<void> {
    const dotEnvLines = [
            `HOST=http://${this.connection.host}`,
            `PORT=${this.connection.port}`
    ]

    const dotenvContent = dotEnvLines.join('\n')

    await writeFile(path.resolve(`${SERVER_TEMPLATE_DIRECTORY}`, '.env'), dotenvContent, 'utf-8')
  }

  async compileServer (): Promise<OutputServer> {
    const bundleOutput = await CommandAsPromiseUtil.commander(BUNDLE_SERVER_COMMAND)

    console.log(bundleOutput)

    const compileOutput = await CommandAsPromiseUtil.commander(`pkg ./src/server-template/build/server/index.js -o ${this.outputPath}`)

    console.log(compileOutput)

    const fileBuffer = await readFile(this.outputPath)

    this.setHash(fileBuffer)

    return this
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
