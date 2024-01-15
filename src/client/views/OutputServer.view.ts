const { default: inquirer } = require('fix-esm').require('inquirer')

export class OutputServerView {
  async askServerConfiguration (): Promise<{
    host: string
    port: number
    outputPath?: string
  }> {
    const response = await inquirer.prompt([
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
        default: undefined,
        name: 'outputPath'
      }
    ])

    return response
  }
}
