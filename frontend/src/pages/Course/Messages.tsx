import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {io} from 'socket.io-client'
import ChatBody from '../../components/Course/messaging/ChatBody'

function Messages() {
  const [newMessage,setNewMessage] = useState<string>('')
  const [messages,setMessages] = useState<string[]>([])
  const {id:courseId} = useParams<string>()
  const socket = io("http://localhost:5000")

  const sendMessage = () =>{
    if(newMessage){
      const messageData = {
         courseId,
         newMessage,
         time:
          new Date().getHours() + ":" +
          new Date().getMinutes(),
      }
      socket.emit("send_message",messageData)
      setNewMessage('')
    }
  }

  useEffect(()=>{
    socket.emit("join_room","room")
     socket.on("receive_message",(data)=>{
      console.log(data)
      setMessages(pre=>[...pre,data.newMessage])
     })
     return () =>{
       socket.off("join_room")
     }
  },[])

  return (
  <div className='lg:w-6 mx-auto grayBackground' style={{minHeight:"92.5vh"}}>
   <ChatBody messages={messages}/>
   <div className='flex justify-content-around align-items-center' style={{ minHeight:"8.5vh"}}>
   <div className="col-11 flex flex-column gap-2 pt-2">
      <InputText placeholder='Message...' id="email" aria-describedby="email-help" className="my-input"
      value={newMessage} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMessage(e.target.value)}/>
     </div>
     <div className='col-1 mx-auto '>
     <Button icon="pi pi-send"  rounded text className='textButt' onClick={sendMessage}/>
     </div>
   </div>
  </div>
  )
}

export default Messages

