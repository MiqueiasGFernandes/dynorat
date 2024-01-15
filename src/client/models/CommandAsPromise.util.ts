import { execSync } from 'node:child_process'

export class Commander {
  static command (command: string): string {
    return execSync(command).toString()
  }
}
