export interface ServerToClientEvents {
    receive_message:(data:string)=>void
}
  
export interface ClientToServerEvents {
    join_room:(data:string)=>void,
    send_message:(data:string)=>void
}
  
export interface InterServerEvents {
    
}
  
export interface SocketData {
    
}