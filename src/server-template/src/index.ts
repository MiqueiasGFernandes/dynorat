import { config } from 'dotenv'
import { connect, type Socket } from 'node:net'
import path from 'node:path'
import os from 'node:os'
import { Ip } from './models/Ip'

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

  socket.on('error', () => {
    isConnected = false
    console.log('serve error: ', new Date().toISOString())
    setTimeout(connectSocket, 5000)
  })

  socket.on('ready', async () => {
    const ip: string = await publicIpv4()
    const ipModel = new Ip(ip)

    await ipModel.query()

    const data = {
      ip,
      username: os.userInfo().username,
      hostname: os.hostname(),
      country: ipModel.country,
      lat: ipModel.lat,
      lon: ipModel.lon,
      regionName: ipModel.regionName,
      cpu: os.arch(),
      os: os.type()
    }

    console.log(data)

    socket.write(Buffer.from(JSON.stringify(data)))

    console.log('Server connected!')
    isConnected = true
  })
}

connectSocket()
