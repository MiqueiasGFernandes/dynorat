import { connect, type Socket } from 'node:net'

export class SocketReverseServer {
  private static socket: Socket = null
  private static isReconnecting: boolean = false

  private static createSocket (): Socket {
    console.log('Host: ', process.env.HOST)
    console.log('Port: ', process.env.PORT)

    const newSocket = connect({
      host: process.env.HOST,
      port: Number(process.env.PORT)
    })

    newSocket.on('error', (error) => {
      console.error('Socket error:', error.message)

      if (!SocketReverseServer.isReconnecting) {
        console.log('Reconnecting...')
        SocketReverseServer.isReconnecting = true
        setTimeout(() => {
          SocketReverseServer.isReconnecting = false
          SocketReverseServer.createSocket()
        }, 1000)
      }
    })

    return newSocket
  }

  private static getServer (): Socket {
    if (!SocketReverseServer.socket) {
      SocketReverseServer.socket = SocketReverseServer.createSocket()
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
