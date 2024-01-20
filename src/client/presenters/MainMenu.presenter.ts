import { Command } from 'commander'
import { EventListener } from '../event/EventListener'
import { type MainMenuView } from '../views/MainMenu.view'

export class MainMenuPresenter {
  constructor (private readonly _view: MainMenuView) {}

  showMainMenu (): void {
    this._view.showMainMenu()
  }

  chooseMenuOptions (internalCommand: string): void {
    const program = new Command()

    program.usage('[command] [options]')

    program
      .command('help')
      .description('Help option')
      .action(() => {
        console.log('Help command text here...')
      })

    program
      .command('clear')
      .description('Clean the CLI display')
      .action(() => {
        console.clear()
      })

    program
      .command('server')
      .option('-g, --generate', 'Generate server with reverse TCP payload')
      .action((options) => {
        if (options.generate) {
          EventListener.getEventEmitter().emit('CONFIGURE_SERVER')
        }
      })

    program
      .command('session')
      .option('-l, --list', 'Show list of sessions', () => {
        EventListener.getEventEmitter().emit('SHOW_SESSIONS')
      })
      .option('-i, --interact <id>', 'Interact with session by id', (id) => {
        EventListener.getEventEmitter().emit('INTERACT_SESSION', Number(id))
      })
      // .argument('<id>', 'ID of connection')
      // .action((options) => {
      //   if (options.list) {
      //     EventListener.getEventEmitter().emit('SHOW_SESSIONS')
      //   }
      //   if (options.interact) {
      //     EventListener.getEventEmitter().emit('INTERACT_SESSION', options.id)
      //   }
      // })

    program.command('exit').action(() => {
      console.log('Saindo...')
      process.exit(0)
    })

    program.parse(['', '', ...internalCommand.split(' ')])
  }
}
