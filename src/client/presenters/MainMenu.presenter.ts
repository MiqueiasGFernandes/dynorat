import { EventListener } from '../event/EventListener'
import { type Connection } from '../models/Connection'
import { type MainMenuView } from '../views/MainMenu.view'
import { type SessionsPresenter } from './Sessions.presenter'
import { Command } from 'commander'

export class MainMenuPresenter {
  private _connections: Connection[]

  constructor (
    private readonly _view: MainMenuView,
    private readonly _showSessionsPresenter: SessionsPresenter
  ) {}

  setConnections (connections: Connection[]): void {
    this._connections = connections
  }

  showMainMenu (): void {
    this._view.showMainMenu()
  }

  chooseMenuOptions (internalCommand: string): void {
    const program = new Command()

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

    program.parse(['', '', ...internalCommand.split(' ')])

    EventListener.getEventEmitter().emit('GO_TO_MAIN_MENU')
  }
}
