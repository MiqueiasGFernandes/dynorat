import { type DataSource } from 'typeorm'
import { OutputServerPresenter } from '../presenters/OutputServer.presenter'
import { OutputServer } from '../models/OutputServer'
import { OutputServerView } from '../views/OutputServer.view'

export class PresentersFactory {
  private static dataSource: DataSource | null = null

  static setDataSource (dataSource: DataSource): void {
    if (PresentersFactory.dataSource === null) {
      PresentersFactory.dataSource = dataSource
    }
  }

  static outputServerPresenter (): OutputServerPresenter {
    return new OutputServerPresenter(
      this.dataSource!.getRepository(OutputServer),
      new OutputServerView()
    )
  }
}
