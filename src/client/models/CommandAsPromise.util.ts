import { execSync } from 'node:child_process'

export class Commander {
  static command (command: string): string {
    try {
      return execSync(command).toString()
    } catch (error: any) {
      console.error(error.stderr.toString())
      throw new Error(error.message as string)
    }
  }
}
