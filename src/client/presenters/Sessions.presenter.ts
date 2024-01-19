import Table from 'cli-table'
import { type Connection } from '../models/Connection'
export class SessionsPresenter {
  private _connections: Connection[]

  setConnections (connections: Connection[]): void {
    this._connections = connections
  }

  showSessions (): void {
    const table = new Table({
      head: ['# ID', 'IP Address', 'Country', 'User', 'Hostname', 'Latitute', 'Longitute', 'OS', 'CPU']
    })

    this._connections.forEach((item, index) => {
      const id = String(index + 1)
      table.push(
        [id, item.ip, item.country, item.username, item.hostname, item.lat, item.lon, item.os, item.cpu]
      )
    })

    console.log(table.toString())
  }
}
