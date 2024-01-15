import { Server } from 'socket.io'

export class SessionsPresenter {
  showSessions (): void {
    const client = new Server()

    const handler = client.listen(4444)

    console.log('Listening...')

    handler.on('connection', (socket) => {
      const address = socket.handshake

      console.log(`IP: ${address.address}`)
    })
  }
}
