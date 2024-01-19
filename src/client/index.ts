import { createServer, type Server } from 'node:net'
import { DataSource } from 'typeorm'
import packageData from '../../package.json'
import { PresentersFactory } from './boostrap/Presenters.factory'
import { DatabaseConfig } from './db/Config'
import { EventListener } from './event/EventListener'
import { TemplateView } from './views/Template.view'
import { type Connection } from './models/Connection'

const dataSource = new DataSource(DatabaseConfig.configure())
const connections: Connection[] = []

function connectToClient (): Server {
  const newServer = createServer((socket) => {
    socket.on('data', (data) => {
      const jsonData: Record<string, string> = JSON.parse(data.toString())

      connections.push(jsonData as unknown as Connection)
    })
  })

  newServer.listen(4444)

  return newServer
}

void dataSource.initialize().catch((error) => {
  console.error(error)
  process.exit(1)
}).then(() => {
  new TemplateView().showWelcomeTemplate({
    author: packageData.author,
    description: packageData.description,
    title: packageData.name,
    repositoryUrl: packageData.repository.url,
    version: packageData.version
  })

  PresentersFactory.setDataSource(dataSource)

  connectToClient()

  const mainMenuPresenter = PresentersFactory.makeMainMenuPresenter()
  const outputServerPresenter = PresentersFactory.makeOutputServerPresenter()
  const sessionsPresenter = PresentersFactory.makeSessionsPresenter()

  const eventEmitter = EventListener.getEventEmitter()

  sessionsPresenter.setConnections(connections)

  eventEmitter.on('CHOSE_MENU_OPTION', mainMenuPresenter.chooseMenuOptions.bind(mainMenuPresenter))
  eventEmitter.on('BUILD_SERVER', outputServerPresenter.handleCompileAndBuildServer.bind(outputServerPresenter))
  eventEmitter.on('CONFIGURE_SERVER', outputServerPresenter.handleServerCreation.bind(outputServerPresenter))
  eventEmitter.on('GO_TO_MAIN_MENU', mainMenuPresenter.showMainMenu.bind(mainMenuPresenter))
  eventEmitter.on('SHOW_SESSIONS', sessionsPresenter.showSessions.bind(sessionsPresenter))

  eventEmitter.emit('GO_TO_MAIN_MENU')
})
