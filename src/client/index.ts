import { config } from 'dotenv';
import { io } from 'socket.io-client';

const {default: inquirer } = require('fix-esm').require("inquirer");


async function connect(){
    config()

    const client = io("http://localhost:4444")

    client.on('connect', async () => {
        console.log('Connected to server');
        
        client.emit('command', 'echo -n $PS1'); 

        client.on("error", (error) => {
          console.log(error)
        })
        client.on("result", async (data: unknown) =>{
          const {command} = await inquirer.prompt([
            {
              name: 'command',
              prefix: '',
              sufix: '',
              message: data
            }
          ])
          
          client.emit('command', `${command} && echo -n $PS1`); 
        })
      });
}

connect()