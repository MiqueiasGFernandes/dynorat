import Table from 'cli-table'
import { type Connection } from '../models/Connection'
import { EventListener } from '../event/EventListener'
export class SessionsPresenter {
  showSessions (data: Connection[]): void {
    const table = new Table({
      head: ['# ID', 'IP Address', 'Country', 'User', 'Hostname', 'Latitute', 'Longitute', 'OS', 'CPU']
    })

    data.forEach((item, index) => {
      const id = String(index + 1)

      table.push(
        [id, item.ip, item.country, item.username, item.hostname, item.lat, item.lon, item.os, item.cpu]
      )
    })

    console.log(table.toString())

    EventListener.getEventEmitter().emit('GO_TO_MAIN_MENU')
  }
}
