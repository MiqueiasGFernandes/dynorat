import { config } from 'dotenv'
import { connect, type Socket } from 'node:net'
import path from 'node:path'

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

  socket.on('connect', () => {
    console.clear()
    console.log('Server connected!')
  })
}

connectSocket()
