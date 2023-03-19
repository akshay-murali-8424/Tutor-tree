import { Avatar } from 'primereact/avatar'
import { Button } from 'primereact/button'
import { useState } from 'react'
import { UserInterface } from '../../../Types/UserInterface'
import AddPeopleModal from './AddPeopleModal'

function PeopleList({title,members,user}:{title:string,members:UserInterface[],user:"teacher" | "student"}) {
  const [peopleVisible,setPeopleVisible] = useState<boolean>(false)
  let type:"Teacher" | "Student"="Teacher"
  if(title==="Teachers"){
    type = "Teacher"
  }else if(title==="Students" || "Classmates"){
    type = "Student"
  }
  return (
    <div className='mt-6'>
      <div className='flex justify-content-between align-items-center'>
    <span className='text-3xl primary p-2'>{title}</span>
   {user==="teacher" &&<div><Button icon="pi pi-user-plus" rounded text className='textButt' onClick={()=>setPeopleVisible(true)}/></div>  }
      </div>
    <hr className='primaryHr'/>
    <div>
     {
      members.map((member,i)=>{
        return(
          <>
          <div className='m-2 flex align-items-center'>
          <Avatar
          label={member.firstName[0]}
          className="primaryButt mr-2"
          shape="circle"
          style={{ color: "white" }}
          />
          <span className='accent text-sm pl-2'>{member.firstName+" "+member.lastName}</span>
          </div>
          {members.length-1 !== i&&<hr />}
          </>
        )
      })
     }
    </div>
    <AddPeopleModal peopleVisible={peopleVisible} setPeopleVisible={setPeopleVisible} type={type}/>
   </div>
  )
}

export default PeopleList