import { type MainMenuView } from '../views/MainMenu.view'
import { type OutputServerPresenter } from './OutputServer.presenter'
import { type SessionsPresenter } from './ShowSessions.presenter'

export class MainMenuPresenter {
  constructor (
    private readonly _view: MainMenuView,
    private readonly _outputServerPresenter: OutputServerPresenter,
    private readonly _showSessionsPresenter: SessionsPresenter
  ) {
  }

  async showMainMenu (): Promise<void> {
    const internalCommand = await this._view.showMainMenu()

    switch (internalCommand) {
      case 'generate server':
        await this._outputServerPresenter.handleServerCreation()
        break
      case 'show sessions':
        this._showSessionsPresenter.showSessions()
        break
      default:
        console.log('Help')
        break
    }
  }
}
