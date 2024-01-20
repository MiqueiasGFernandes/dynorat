import Table from 'cli-table'
import { type Connection } from '../models/Connection'
import { EventListener } from '../event/EventListener'
const { default: inquirer } = require('fix-esm').require('inquirer')
export class SessionsPresenter {
  private _connections: Connection[]
  private _sessionConnection: Connection

  setConnections (connections: Connection[]): void {
    this._connections = connections
  }

  interact (id: number): void {
    this._sessionConnection = this._connections.find((item) => item.id === id)

    this._sessionConnection.interact()
  }

  runSessionCommand (cmd: string): void {
    this._sessionConnection.runCommand(cmd)
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

    EventListener.getEventEmitter().emit('GO_TO_MAIN_MENU')
  }

  initializeSessionCmd (prefix: string): void {
    inquirer.prompt([
      {
        name: 'command',
        prefix: '',
        sufix: '',
        message: prefix
      }
    ]).then(({ command }: { command: string }) => {
      EventListener.getEventEmitter().emit('RUN_SESSION_CMD', command)
      EventListener.getEventEmitter().emit('INIT_SESSION_CMD', command)
    })
  }
}
