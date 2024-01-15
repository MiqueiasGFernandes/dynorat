import { EventListener } from '../event/EventListener'
import { type MainMenuView } from '../views/MainMenu.view'
import { type SessionsPresenter } from './Sessions.presenter'

export class MainMenuPresenter {
  constructor (
    private readonly _view: MainMenuView,
    private readonly _showSessionsPresenter: SessionsPresenter
  ) {
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
        this._showSessionsPresenter.showSessions()
        break
      default:
        console.log(internalCommand)
        console.log('Help')
        break
    }
  }
}
