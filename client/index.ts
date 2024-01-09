import { io } from "socket.io-client"

async function connect(){
    const client = io("http://localhost:4444")

    client.on('connect', () => {
        console.log('Connected to server');
        
        client.emit('command', 'ls -la'); 

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