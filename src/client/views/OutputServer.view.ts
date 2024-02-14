import { EventListener } from '../event/EventListener'
import { type BuildServerOptions } from '../types/build-server-options'

const { default: inquirer } = require('fix-esm').require('inquirer')

export class OutputServerView {
  askServerConfiguration (): void {
    inquirer.prompt([
      {
        type: 'string',
        message: 'Define the revert host to connect (Ex: 192.168.0.1):',
        name: 'host'
      },
      {
        type: 'number',
        message: 'Define the port to connect (The same openned in client computer):',
        name: 'port'
      },
      {
        type: 'string',
        message: 'Set the server output path (Default is current user folder):',
        name: 'outputPath'
      },
      {
        type: 'checkbox',
        name: 'os',
        message: 'Select the operational systems to generate binary:',
        choices: [
          {
            name: 'Windows',
            value: 'windows'
          },
          {
            name: 'Linux',
            value: 'linux'
          }
        ]
      }
    ]).then((response: BuildServerOptions) => {
      EventListener.getEventEmitter().emit('BUILD_SERVER', response)
    })
  }
}
