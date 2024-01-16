import { createServer, type Server, type Socket } from 'node:net'

export class SocketRevertClient {
  private static socket: Server = null

  private static createServer (): Server {
    const newServer = createServer((socket: Socket) => {
      console.log('Client connected')
    })

    newServer.listen(4444, () => {
      console.log('Listening server')
    })

    return newServer
  }

  static getClient (): Server {
    if (!SocketRevertClient.socket) {
      SocketRevertClient.socket = SocketRevertClient.createServer()
    }

    return SocketRevertClient.socket
  }

  static on (eventName: string, action: (...args: any[]) => void): SocketRevertClient {
    SocketRevertClient.getClient().on(eventName, action)

    return SocketRevertClient
  }

  static emit (eventName: string, data: unknown): SocketRevertClient {
    SocketRevertClient.getClient().emit(eventName, data)

    return SocketRevertClient
  }

  static close (): void {
    SocketRevertClient.getClient().close()

    SocketRevertClient.socket = null
  }
}
