import { Server } from 'socket.io';
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from '../../types/socketInterfaces';

const socketConfig = (io:Server<ClientToServerEvents,ServerToClientEvents,InterServerEvents,SocketData>) =>{
    
    io.on("connection",(socket)=>{
        console.log(`user connected ${socket.id}`.bg_magenta);
        
        socket.on("join_room",(data)=>{
            socket.join(data)
            console.log(`user ${socket.id} joined ${data}`)
        })
    
        socket.on("send_message",(data)=>{
            console.log(data)
            socket.to("room").emit("receive_message",data)
        })
    
        socket.on("disconnect",()=>{
            console.log("disconnected",socket.id)
        })
    })
}

export default socketConfig