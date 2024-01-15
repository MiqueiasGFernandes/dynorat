import { config } from 'dotenv'
import { Server } from 'socket.io'

const { default: inquirer } = require('fix-esm').require('inquirer')

async function connect (): Promise<void> {
  config()

  const client = new Server()

  console.log(process.env.PORT)

  const handler = client.listen(Number(process.env.PORT))

  console.log('Listening...')

  handler.on('connection', (socket) => {
    console.log('Connected')

    socket.emit('command', 'echo -n $PS1')

    socket.on('error', (error) => {
      console.log(error)
    })
    socket.on('result', async (data: unknown) => {
      const { command } = await inquirer.prompt([
        {
          name: 'command',
          prefix: '',
          sufix: '',
          message: data
        }
      ])

      client.emit('command', `${command} && echo -n $PS1`)
    })
  })
}

connect()
