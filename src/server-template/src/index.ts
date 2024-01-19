import { config } from 'dotenv'
import { connect, type Socket } from 'node:net'
import path from 'node:path'

const { publicIpv4 } = require('fix-esm').require('public-ip')

config({
  path: path.resolve('src', 'server-template', '.env')
})

let socket: Socket
let isConnected = false

function connectSocket (): void {
  if (!isConnected) {
    socket = connect({
      host: process.env.HOST,
      port: Number(process.env.PORT),
      allowHalfOpen: true,
      keepAlive: true
    })
  }

  socket.on('error', (err) => {
    isConnected = false

    console.error(`Error in connection: ${err.message}`)
    setTimeout(connectSocket, 1000)
  })

  socket.on('close', () => {
    isConnected = false
    console.log('Socket closed')
    setTimeout(connectSocket, 1000)
  })

  socket.on('ready', async () => {
    isConnected = true

    const ip: string = await publicIpv4()

    console.log(ip)

    socket.write(Buffer.from(ip))

    console.log('Server connected!')
  })
}

connectSocket()
