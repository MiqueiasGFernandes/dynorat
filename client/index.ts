import { config } from 'dotenv';
import { io } from "socket.io-client"

async function connect(){
    config()

    const client = io("http://localhost:4444")

    client.on('connect', () => {
        console.log('Connected to server');
        
        client.emit('command', 'pwd'); 

        console.log('Waiting for result...')

        client.on("error", (error) => {
          console.log(error)
        })
        client.on("result", (data) =>{
          console.log(data)
        })
      });
}

connect()