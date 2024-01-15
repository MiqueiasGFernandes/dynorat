import { CommandAsPromiseUtil } from '../models/CommandAsPromise.util'

const { default: inquirer } = require('fix-esm').require('inquirer')

export class MainMenuView {
  async showMainMenu (): Promise<string> {
    await CommandAsPromiseUtil.commander('clear')
    const { internalCommand } = await inquirer.prompt([
      {
        name: 'internalCommand',
        prefix: '',
        sufix: '',
        message: '(dyno)->'
      }
    ])

    return internalCommand
  }
}
