import { Server } from 'socket.io'
import Table from 'cli-table'
export class SessionsPresenter {
  showSessions (): void {
    const client = new Server()

    const handler = client.listen(4444)

    const table = new Table({
      head: ['# ID', 'IP Address', 'Port', 'Country', 'OS', 'User']
    })

    handler.on('connection', (socket) => {
      const address = socket.handshake

      console.log(`IP: ${address.address}`)
    })
  }
}
