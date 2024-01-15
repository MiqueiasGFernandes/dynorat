import path from 'node:path';
import { createHash } from 'node:crypto';
import { writeFile } from 'fs/promises';
import { CommandAsPromiseUtil } from './CommandAsPromise.util';
import { Column, Entity, PrimaryColumn } from 'typeorm';

const BUNDLE_SERVER_COMMAND = "npm run bundle:server"
const SERVER_TEMPLATE_DIRECTORY = path.resolve(__dirname, "server-template")

type ConnectionOptions =  {
    port: number
    host: string
}

@Entity('output_servers')
export class OutputServer {

    @PrimaryColumn({ name: 'id' })
    private _id!: string

    @Column({ unique: true, name: 'hash' })
    private _hash!: string


    @Column({ name: 'port' })
    private _port!: number

    @Column({ name: 'host' })
    private _host!: string

    constructor (
        public outputPath: string = `~/server`,
        public connection: ConnectionOptions
    ) {}
    

    async writeSettingsAtTemporarlyDotEnv(): Promise<void> {
        const dotEnvLines = [
            `HOST=${this.connection.host}`,
            `PORT=${this.connection.port}`
        ]


        const dotenvContent = dotEnvLines.join("\n")

        await writeFile(path.resolve(`${SERVER_TEMPLATE_DIRECTORY}`, '.env'), dotenvContent, 'utf-8')
    }

    async compileServer(): Promise<OutputServer>{
        const bundleOutput = await CommandAsPromiseUtil.commander(BUNDLE_SERVER_COMMAND)

        console.log(bundleOutput)

        const compileOutput = await CommandAsPromiseUtil.commander(`pkg ./build/server/index.js -o ${this.outputPath}`)

        console.log(compileOutput)

        return this
    }

     setConnection(connection: ConnectionOptions) {
        this._host = connection.host
        this._port = connection.port
    }


    setId(){
        this._id = crypto.randomUUID()
    }

    setHash(file: Buffer): void {
        const hash = createHash("sha256")

        hash.update(file)

        this._hash = hash.digest("hex")
    }


}