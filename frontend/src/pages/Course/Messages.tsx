import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ChatBody from '../../components/Course/messaging/ChatBody'
import { useSelector } from 'react-redux'
import { selectuserAuth } from '../../redux/Features/reducers/userAuthSlice'
import { io } from 'socket.io-client'
import { useGetMessagesQuery } from '../../redux/Features/api/apiSlice'
import { IGetMessagesResponse } from '../../Types/ResponseInterface'


function Messages() {
  const {id:courseId} = useParams<string>()
  const {data,isSuccess} = useGetMessagesQuery({id:courseId}) 
  const [newMessage,setNewMessage] = useState<string>('')
  const [messages,setMessages] = useState<IGetMessagesResponse[]>([])
  if(!messages.length&&data?.length){
    setMessages(data)
  }
  const {token} =useSelector(selectuserAuth)
  const socket = io("http://localhost:5000",{
  query:{token}
   })
  

  const sendMessage = () =>{
    if(newMessage){
      const messageData = {
         course:courseId,
         message:newMessage,
      }
      socket.emit("send_message",messageData)
      setNewMessage('')
    }
  }

  useEffect(()=>{
    socket.emit("join_room",courseId)
    socket.on("receive_message",(data)=>{
      console.log({data})
      setMessages(pre=>[...pre,data])
    })
     return () =>{
       socket.off("join_room")
       socket.off('receive_message')
     }
  },[])

  return (
  <div className='lg:w-6 mx-auto grayBackground' style={{minHeight:"92.5vh"}}>
   <ChatBody messages={messages}/>
   <div className='flex justify-content-around align-items-center' style={{ minHeight:"8.5vh"}}>
   <div className="col-11 flex flex-column gap-2 pt-2">
      <InputText placeholder='Message...' id="email" aria-describedby="email-help" className="my-input"
      value={newMessage} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMessage(e.target.value)}
      // onKeyUp={(e)=>{
      //   if(e.key==='Enter'){
      //     setNewMessage(  )
      //   }
      // }}
      />
     </div>
     <div className='col-1 mx-auto '>
     <Button icon="pi pi-send"  rounded text className='textButt' onClick={sendMessage}/>
     </div>
   </div>
  </div>
  )
}

export default Messages

