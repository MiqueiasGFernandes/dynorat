import { connect, type Socket } from 'node:net'

export class SocketReverseServer {
  private static socket: Socket | null = null
  private static isReconnecting: boolean = true

  private static createSocket (): Socket {
    const newSocket = connect({
      host: process.env.HOST,
      port: Number(process.env.PORT)
    })

    newSocket.on('error', (error) => {
      console.error('Socket error:', error.message)

      if (!SocketReverseServer.isReconnecting) {
        SocketReverseServer.reconnect()
      }
    })

    newSocket.on('close', () => {
      console.log('Socket closed')

      if (SocketReverseServer.isReconnecting) {
        SocketReverseServer.reconnect()
      }
    })

    newSocket.on('connect', () => {
      console.log('Server connected!')
      SocketReverseServer.isReconnecting = false
    })

    return newSocket
  }

  private static reconnect (): void {
    setTimeout(() => {
      SocketReverseServer.socket = SocketReverseServer.createSocket()
    }, 1000)
  }

  static getServer (): Socket {
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
    const server = SocketReverseServer.getServer()

    if (server && server.writable) {
      server.emit(eventName, data)
    } else {
      console.error('Socket not writable. Reconnecting...')
      SocketReverseServer.reconnect()
    }

    return SocketReverseServer
  }

  static close (): void {
    if (SocketReverseServer.socket) {
      SocketReverseServer.socket.end()
      SocketReverseServer.socket = null
    }
  }
}
