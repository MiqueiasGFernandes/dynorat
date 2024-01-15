// import { config } from 'dotenv'
// import { Server } from 'socket.io'

import { DataSource } from 'typeorm'
import { PresentersFactory } from './boostrap/Presenters.factory'
import { DatabaseConfig } from './db/Config'
import { TemplateView } from './views/Template.view'
import packageData from '../../package.json'
import { EventListener } from './event/EventListener'

// const { default: inquirer } = require('fix-esm').require('inquirer')

// async function connect (): Promise<void> {
//   config()

//   const client = new Server()

//   console.log(process.env.PORT)

//   const handler = client.listen(Number(process.env.PORT))

//   console.log('Listening...')

//   handler.on('connection', (socket) => {
//     console.log('Connected')

//     socket.emit('command', 'echo -n $PS1')

//     socket.on('error', (error) => {
//       console.log(error)
//     })
//     socket.on('result', async (data: unknown) => {
//       const { command } = await inquirer.prompt([
//         {
//           name: 'command',
//     })
//     socket.on('result', async (data: unknown) => {
//       const { command } = await inquirer.prompt([
//         {
//           name: 'command',
//           prefix: '',
//           sufix: '',
//           message: data
//         }
//       ])

//       client.emit('command', `${command} && echo -n $PS1`)
//     })
//   })
// }

// connect()

const dataSource = new DataSource(DatabaseConfig.configure())

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

  const mainMenuPresenter = PresentersFactory.makeMainMenuPresenter()
  const outputServerPresenter = PresentersFactory.makeOutputServerPresenter()

  const eventEmitter = EventListener.getEventEmitter()

  eventEmitter.on('CHOSE_MENU_OPTION', mainMenuPresenter.chooseMenuOptions.bind(mainMenuPresenter))
  eventEmitter.on('BUILD_SERVER', outputServerPresenter.handleCompileAndBuildServer.bind(outputServerPresenter))
  eventEmitter.on('CONFIGURE_SERVER', outputServerPresenter.handleServerCreation.bind(outputServerPresenter))
  eventEmitter.on('GO_TO_MAIN_MENU', mainMenuPresenter.showMainMenu.bind(mainMenuPresenter))

  eventEmitter.emit('GO_TO_MAIN_MENU')
})
