import { EventListener } from '../event/EventListener'
import { type MainMenuView } from '../views/MainMenu.view'
import { type SessionsPresenter } from './Sessions.presenter'
import { type Server } from 'node:net'

export class MainMenuPresenter {
  private _socket: Server
  constructor (
    private readonly _view: MainMenuView,
    private readonly _showSessionsPresenter: SessionsPresenter
  ) {
  }

  setSocket (socket: Server): void {
    this._socket = socket
  }

  showMainMenu (): void {
    this._view.showMainMenu()
  }

  chooseMenuOptions (internalCommand: string): void {
    switch (internalCommand) {
      case 'generate server':
        EventListener.getEventEmitter().emit('CONFIGURE_SERVER')
        break
      case 'show sessions':
        this._showSessionsPresenter.showSessions(this._socket)
        break
      default:
        console.log(internalCommand)
        console.log('Help')
        break
    }
  }
}
