import { type Socket } from 'node:net'

export class Connection {
  constructor (
    public readonly id: number,
    public readonly ip: string,
    public readonly username: string,
    public readonly hostname: string,
    public readonly country: string,
    public readonly lat: string,
    public readonly lon: string,
    public readonly regionName: string,
    public readonly cpu: string,
    public readonly os: string,
    public readonly socket: Socket
  ) {
  }

  interact (): void {
    this.socket.write(JSON.stringify({
      type: 'INIT'
    }))
  }

  runCommand (cmd: string): void {
    this.socket.write(JSON.stringify({
      type: 'COMMAND',
      data: cmd
    }))
  }

  kill (): void {
    this.socket.write(JSON.stringify({
      type: 'KILL'
    }))
  }
}
