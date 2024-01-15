import { promisify } from 'node:util';
import { exec } from 'node:child_process'

export class CommandAsPromiseUtil {
    static commander = promisify(exec)

    async command(command: string): Promise<string> {
        return (await CommandAsPromiseUtil.commander(command)).stdout
    }
}