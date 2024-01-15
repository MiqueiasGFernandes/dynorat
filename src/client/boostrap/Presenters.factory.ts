import { type DataSource } from 'typeorm'
import { OutputServerPresenter } from '../presenters/OutputServer.presenter'
import { OutputServer } from '../models/OutputServer'
import { OutputServerView } from '../views/OutputServer.view'
import { MainMenuPresenter } from '../presenters/MainMenu.presenter'
import { MainMenuView } from '../views/MainMenu.view'
import { SessionsPresenter } from '../presenters/Sessions.presenter'

export class PresentersFactory {
  private static dataSource: DataSource | null = null

  static setDataSource (dataSource: DataSource): void {
    if (PresentersFactory.dataSource === null) {
      PresentersFactory.dataSource = dataSource
    }
  }

  static makeOutputServerPresenter (): OutputServerPresenter {
    return new OutputServerPresenter(
      this.dataSource.getRepository(OutputServer),
      new OutputServerView()
    )
  }

  static makeSessionsPresenter (): SessionsPresenter {
    return new SessionsPresenter()
  }

  static makeMainMenuPresenter (): MainMenuPresenter {
    return new MainMenuPresenter(
      new MainMenuView(),
      PresentersFactory.makeSessionsPresenter()
    )
  }
}
