import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {io} from 'socket.io-client'

function Messages() {
  const [message,setMessage] = useState<string>()
  const socket = io("http://localhost:5000")
  const {id:courseId} = useParams<string>()

  const sendMessage = () =>{
    if(message){
      const messageData = {
         courseId,
         message,
         time:
          new Date().getHours() + ":" +
          new Date().getMinutes(),
      }
     socket.emit("send_message",messageData)
    }
  }

  useEffect(()=>{
     socket.on("receive_message",(data)=>{
      console.log(data)
      return socket.off('receive_message')
     })
  },[])

  return (
  <div className='lg:w-5 mx-auto grayBackground' style={{minHeight:"92.5vh"}}>
   <div style={{ minHeight:"84vh"}}>
    dcd
   </div>
   <div className='flex justify-content-around align-items-center' style={{ minHeight:"8.5vh"}}>
   <div className="col-11 flex flex-column gap-2 pt-2">
      <InputText placeholder='Message...' id="email" aria-describedby="email-help" className="my-input"
      value={message} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}/>
     </div>
     <div className='col-1 mx-auto'>
     <Button icon="pi pi-send"  rounded text className='textButt' onClick={sendMessage}/>
     </div>
   </div>
  </div>
  )
}

export default Messages

