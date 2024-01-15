// import { config } from 'dotenv'
// import { Server } from 'socket.io'

import { DataSource } from 'typeorm'
import { PresentersFactory } from './boostrap/Presenters.factory'
import { DatabaseConfig } from './db/Config'

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

async function start (): Promise<void> {
  const dataSource = new DataSource(DatabaseConfig.configure())

  await dataSource.initialize().catch((error) => {
    console.error(error)
  })

  PresentersFactory.setDataSource(dataSource)

  const outputServerPresenter = PresentersFactory.outputServerPresenter()
  await outputServerPresenter.handleServerCreation()
}

start().catch((error) => {
  console.error(error)
  process.exit(1)
})
