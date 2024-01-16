import { createServer, type Server } from 'node:net'

export class SocketRevertClient {
  private static socket: Server = null

  static getClient (): Server {
    if (!SocketRevertClient.socket) {
      SocketRevertClient.socket = createServer().listen(4444, () => {
        console.log('Listening server')
      })
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
