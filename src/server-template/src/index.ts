import { config } from 'dotenv'
import { connect, type Socket } from 'node:net'
import path from 'node:path'

const { publicIpv4 } = require('fix-esm').require('public-ip')

config({
  path: path.resolve('src', 'server-template', '.env')
})

let socket: Socket

function connectSocket (): void {
  socket = connect({
    host: process.env.HOST,
    port: Number(process.env.PORT)
  })

  socket.on('error', (err) => {
    console.clear()
    console.error(`Error in connection: ${err.message}`)
    setTimeout(connectSocket, 1000)
  })

  socket.on('close', () => {
    console.clear()
    console.log('Socket closed')
    setTimeout(connectSocket, 1000)
  })

  socket.on('connect', async () => {
    console.clear()

    const ip: string = await publicIpv4()

    console.log(ip)

    socket.write(Buffer.from(ip))

    console.log('Server connected!')
  })
}

connectSocket()
