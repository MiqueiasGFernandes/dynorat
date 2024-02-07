import { Command } from 'commander'
import { EventListener } from '../event/EventListener'
import { type MainMenuView } from '../views/MainMenu.view'
import { GENERAL_HELP_TEXT } from '../constants'

export class MainMenuPresenter {
  private readonly defaultCommands = [
    'clear', 'exit', 'help'
  ]

  constructor (private readonly _view: MainMenuView) { }

  showMainMenu (): void {
    this._view.showMainMenu()
  }

  chooseMenuOptions (internalCommand: string): void {
    const program = new Command()

    program.usage('[command] [options]')

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
      })

    program
      .command('help')
      .argument('[command]', 'command to show help')
      .action((command) => {
        if (command) {
          const help = program.commands
            .find(cmd => cmd.name() === command && !this.defaultCommands.includes(cmd.name()))?.helpInformation()

          if (!help) {
            console.log(GENERAL_HELP_TEXT)
          }
          const helpWithoutHelpDefaultCommand = help.split('\n').filter((line) => !line.includes('--help')).join('\n')
          console.log(helpWithoutHelpDefaultCommand)
          EventListener.getEventEmitter().emit('GO_TO_MAIN_MENU')
          return
        }
        console.log(GENERAL_HELP_TEXT)
        EventListener.getEventEmitter().emit('GO_TO_MAIN_MENU')
      })

    program
      .command('session')
      .option('-l, --list', 'Show list of sessions', () => {
        EventListener.getEventEmitter().emit('SHOW_SESSIONS')
      })
      .option('-i, --interact <id>', 'Interact with session by id', (id) => {
        EventListener.getEventEmitter().emit('INTERACT_SESSION', Number(id))
      })
      .option('-k, --kill <id>', 'Kill session', (id) => {
        EventListener.getEventEmitter().emit('KILL_SESSION', Number(id))
      })

    program.command('exit').action(() => {
      console.log('Saindo...')
      process.exit(0)
    })

    try {
      program.parse(['', '', ...internalCommand.split(' ')])
    } catch (error) {
      EventListener.getEventEmitter().emit('GO_TO_MAIN_MENU')
    }
  }
}
