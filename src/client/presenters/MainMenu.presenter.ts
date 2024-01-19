import { Command } from 'commander'
import { EventListener } from '../event/EventListener'
import { type MainMenuView } from '../views/MainMenu.view'

export class MainMenuPresenter {
  constructor (
    private readonly _view: MainMenuView
  ) { }

  showMainMenu (): void {
    this._view.showMainMenu()
  }

  chooseMenuOptions (internalCommand: string): void {
    const program = new Command()

    program.usage(
      '[command] [options]'
    )

    program
      .command('help')
      .description('Help option')
      .action(() => {
        console.log('Help command text here...')
        EventListener.getEventEmitter().emit('GO_TO_MAIN_MENU')
      })

    program
      .command('clear')
      .description('Clean the CLI display')
      .action(() => {
        console.clear()
        EventListener.getEventEmitter().emit('GO_TO_MAIN_MENU')
      })

    program
      .command('server')
      .option('-g, --generate', 'Generate server with reverse TCP payload')
      .action((options) => {
        if (options.generate) {
          EventListener.getEventEmitter().emit('CONFIGURE_SERVER')
        }
        EventListener.getEventEmitter().emit('GO_TO_MAIN_MENU')
      })

    program
      .command('session')
      .option('-l, --list', 'Show list of sessions')
      .action((options) => {
        if (options.list) {
          EventListener.getEventEmitter().emit('SHOW_SESSIONS')
        }
        EventListener.getEventEmitter().emit('GO_TO_MAIN_MENU')
      })

    program.parse(['', '', ...internalCommand.split(' ')])
  }
}
