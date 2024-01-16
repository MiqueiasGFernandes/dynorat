import { connect, type Socket } from 'node:net'

export class SocketReverseServer {
  private static socket: Socket = null

  static getServer (): Socket {
    if (!SocketReverseServer.socket) {
      SocketReverseServer.socket = connect({
        host: process.env.HOST,
        port: Number(process.env.PORT)
      })
    }

    return SocketReverseServer.socket
  }

  static on (eventName: string, action: (...args: any[]) => void): SocketReverseServer {
    SocketReverseServer.getServer().on(eventName, action)

    return SocketReverseServer
  }

  static emit (eventName: string, data: unknown): SocketReverseServer {
    SocketReverseServer.getServer().emit(eventName, data)

    return SocketReverseServer
  }

  static close (): void {
    SocketReverseServer.getServer().end()

    SocketReverseServer.socket = null
  }
}
