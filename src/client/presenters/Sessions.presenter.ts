import Table from 'cli-table'
import { SocketRevertClient } from '../event/SocketReverseClient'
export class SessionsPresenter {
  showSessions (): void {
    const table = new Table({
      head: ['# ID', 'IP Address', 'Port', 'Country', 'OS', 'User']
    })

    SocketRevertClient
      .on('target_data', (data) => {
        console.log('connected')
        console.log(data)
      })
  }
}
