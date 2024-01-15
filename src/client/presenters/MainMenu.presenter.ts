import { type MainMenuView } from '../views/MainMenu.view'
import { type OutputServerPresenter } from './OutputServer.presenter'

export class MainMenuPresenter {
  constructor (
    private readonly _view: MainMenuView,
    private readonly _outputServerPresenter: OutputServerPresenter
  ) {
  }

  async showMainMenu (): Promise<void> {
    const internalCommand = await this._view.showMainMenu()

    switch (internalCommand) {
      case 'generate server':
        await this._outputServerPresenter.handleServerCreation()
        break
      default:
        console.log('Help')
        break
    }
  }
}
