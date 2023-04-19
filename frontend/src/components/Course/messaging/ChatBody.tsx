import { Avatar } from 'primereact/avatar'
import { IGetMessagesResponse } from '../../../Types/ResponseInterface'
import { useGetUserAndCoursesQuery } from '../../../redux/Features/api/apiSlice'

function ChatBody({messages}:{messages:IGetMessagesResponse[]}) {
 const {data,isSuccess} = useGetUserAndCoursesQuery()
  
 if(isSuccess){
   return (
     <div style={{ height:"84vh", overflowY:"auto"}}>
      {messages.map((message)=>{
       return(
        <>
        {message.user._id===data._id ?
        
        <div className='flex p-2 justify-content-end'>
        <div className='mr-3 box sb1 mt-2 pl-3 pr-3'>
        <div> <span className='text-xs font-bold' style={{color:`#${message.user.color}`}}>
          {`${message.user.firstName} ${message.user.lastName}`}</span> </div>
        <div className='mb-2'><span className='accent text-sm'>{message.message}</span> </div> 
        <div className='flex justify-content-end mb-2'><span className='textGray text-xs'>{`${(new Date(message.sentedTime)).toLocaleString("EN-IN")}`}</span></div>
        </div>
        <Avatar label={message.user.firstName[0]} className='mr-3' style={{color:"white",backgroundColor:`#${message.user.color}`}} shape="circle" />
        </div> :
         <div className='flex p-2'>
         <Avatar label={message.user.firstName[0]} className='mr-3' style={{color:"white",backgroundColor:`#${message.user.color}`}} shape="circle" />
         <div className='ml-1 box sb2 mt-2 pl-3 pr-3'>
         <div> <span className='text-xs font-bold' style={{color:`#${message.user.color}`}}>
           {`${message.user.firstName} ${message.user.lastName}`}</span> </div>
         <div className='mb-2'><span className='accent text-sm'>{message.message}</span> </div> 
         <div className='flex justify-content-end mb-2'><span className='textGray text-xs'>{`${(new Date(message.sentedTime)).toLocaleString("EN-IN")}`}</span></div>
         </div>
         </div> 
        }
        </>
       )
      })}
    </div>
   )
 }else{
   return (
    null
   )
 }
}

export default ChatBody