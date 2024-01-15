import { EventListener } from '../event/EventListener'

const { default: inquirer } = require('fix-esm').require('inquirer')

export class MainMenuView {
  showMainMenu (): void {
    inquirer.prompt([
      {
        name: 'internalCommand',
        prefix: '',
        sufix: '',
        message: '(dyno)->'
      }
    ]).then(({ internalCommand }: { internalCommand: string }) => {
      EventListener.getEventEmitter().emit('CHOSE_MENU_OPTION', internalCommand)
    })
  }
}
