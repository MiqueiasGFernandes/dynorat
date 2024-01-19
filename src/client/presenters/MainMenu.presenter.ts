import { EventListener } from '../event/EventListener'
import { type Connection } from '../models/Connection'
import { type MainMenuView } from '../views/MainMenu.view'
import { type SessionsPresenter } from './Sessions.presenter'

export class MainMenuPresenter {
  private _connections: Connection[]
  constructor (
    private readonly _view: MainMenuView,
    private readonly _showSessionsPresenter: SessionsPresenter
  ) {
  }

  setConnections (connections: Connection[]): void {
    this._connections = connections
  }

  showMainMenu (): void {
    this._view.showMainMenu()
  }

  chooseMenuOptions (internalCommand: string): void {
    switch (internalCommand) {
      case 'generate server':
        EventListener.getEventEmitter().emit('CONFIGURE_SERVER')
        break
      case 'sessions show':
        this._showSessionsPresenter.showSessions(this._connections)
        break
      case 'clear':
        console.clear()

        EventListener.getEventEmitter().emit('GO_TO_MAIN_MENU')
        break
      default:
        console.log(internalCommand)
        console.log('Help')
        break
    }
  }
}
