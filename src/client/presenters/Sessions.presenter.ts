import Table from 'cli-table'
import { type Server } from 'node:net'
export class SessionsPresenter {
  showSessions (socket: Server): void {
    const table = new Table({
      head: ['# ID', 'IP Address', 'Port', 'Country', 'OS', 'User']
    })

    socket
      .on('data', (data) => {
        console.log('connected')
        console.log(data)
      })
  }
}
