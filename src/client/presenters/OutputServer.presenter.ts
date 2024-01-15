import { type Repository } from 'typeorm'
import { OutputServer } from '../models/OutputServer'
import { type OutputServerView } from '../views/OutputServer.view'

export class OutputServerPresenter {
  constructor (
    private readonly _serverRepository: Repository<OutputServer>,
    private readonly _view: OutputServerView
  ) {

  }

  async handleServerCreation (): Promise<void> {
    const { host, port, outputPath } = await this._view.askServerConfiguration()

    const outputServer = new OutputServer(
      outputPath,
      {
        host,
        port
      }
    )

    await outputServer.writeSettingsAtTemporarlyDotEnv()
    await outputServer.compileServer()

    await this._serverRepository.save(outputServer)
  }
}
