import { type Repository } from 'typeorm'
import { OutputServer } from '../models/OutputServer'
import { type OutputServerView } from '../views/OutputServer.view'
import { type BuildServerOptions } from '../types/build-server-options'

export class OutputServerPresenter {
  constructor (
    private readonly _serverRepository: Repository<OutputServer>,
    private readonly _view: OutputServerView
  ) {

  }

  askServerConfiguration (): void {
    this._view.askServerConfiguration()
  }

  handleCompileAndBuildServer (options: BuildServerOptions): void {
    const outputServer = new OutputServer(
      options.outputPath,
      {
        host: options.host,
        port: options.port
      },
      options.os,
      this._serverRepository
    )

    outputServer.writeSettingsAtTemporarlyDotEnv()
    outputServer.compileServer()
  }

  handleServerCreation (): void {
    this._view.askServerConfiguration()
  }
}
