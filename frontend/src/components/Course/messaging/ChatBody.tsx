import { Avatar } from 'primereact/avatar'
import React from 'react'

function ChatBody({messages}:{messages:string[]}) {
  return (
    <div style={{ height:"84vh", overflowY:"auto"}}>
     {messages.map((message)=>{
      return(
        <div className='flex p-2'>
        <Avatar label="U" className='primaryButt mr-3' style={{color:"white"}} shape="circle" />
        <div className='ml-1 box sb2 mt-2 pl-3 pr-3'>
        <div> <span className='text-xs primary font-bold'>Akshay Murali</span> </div>
        <div className='mb-2'><span className='accent text-sm'>{message}</span> </div> 
        </div>
        </div>
      )
     })}
   </div>
  )
}

export default ChatBody