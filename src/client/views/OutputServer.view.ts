import { EventListener } from '../event/EventListener'

const { default: inquirer } = require('fix-esm').require('inquirer')

export class OutputServerView {
  askServerConfiguration (): void {
    inquirer.prompt([
      {
        type: 'string',
        message: 'Define the revert host to connect (Ex: 192.168.0.1): ',
        name: 'host'
      },
      {
        type: 'number',
        message: 'Define the socket to connect (The same openned in client computer): ',
        name: 'port'
      },
      {
        type: 'string',
        message: 'Set the server output path (Default is current user folder): ',
        name: 'outputPath'
      }
    ]).then((response: { host: string, port: number, outputPath: string }) => {
      EventListener.getEventEmitter().emit('BUILD_SERVER', response.host, response.port, response.outputPath)
    })
  }
}
