import { type Repository } from 'typeorm'
import { OutputServer } from '../models/OutputServer'
import { type OutputServerView } from '../views/OutputServer.view'

export class OutputServerPresenter {
  constructor (
    private readonly _serverRepository: Repository<OutputServer>,
    private readonly _view: OutputServerView
  ) {

  }

  askServerConfiguration (): void {
    this._view.askServerConfiguration()
  }

  handleCompileAndBuildServer (host: string, port: number, outputPath: string): void {
    const outputServer = new OutputServer(
      outputPath,
      {
        host,
        port
      }
    )

    outputServer.writeSettingsAtTemporarlyDotEnv()
    outputServer.compileServer()

    this._serverRepository.save(outputServer).catch((error) => { console.error(error) })
  }

  handleServerCreation (): void {
    this._view.askServerConfiguration()
  }
}
