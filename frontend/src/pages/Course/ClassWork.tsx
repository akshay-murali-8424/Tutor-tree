import { Button } from 'primereact/button'
import {  useNavigate, useParams } from 'react-router-dom'
import ClassWorkList from '../../components/Course/classWorkList/ClassWorkList'
import { useGetUserAndCoursesQuery } from '../../redux/Features/api/apiSlice'
import { useRef } from 'react'
import { Menu } from 'primereact/menu'
import { useGetClassWorksQuery } from '../../redux/Features/api/classWorkApiSlice'

function ClassWork() {
  const {id}=useParams<string>()
  const menu = useRef<Menu>(null);
  const { data:userData, isLoading:userIsLoading, isFetching:userIsFetching, isSuccess:userIsSuccess, isError:userIsError, error:userError, refetch:userRefetch } = useGetUserAndCoursesQuery()
  const { data, isLoading, isFetching, isSuccess, isError, error, refetch } = useGetClassWorksQuery({id})
  const navigate = useNavigate()

  let user= "student"

  userData?.coursesAsTeacher.forEach((course)=>{
    if(course._id===id){
      user="teacher"
    }
   })

   const items = [
    {
      label: "Assignment",
      command: () => {
        navigate(`/course/create/${id}`)
      },
    },
    {
      label: "Study Material",
      command: () => {
        navigate(`/course/createMaterial/${id}`)
      },
    },
  ];

  return (
    <div className='lg:w-5 mx-auto my-5'>
      {user==="teacher" &&
        <div>
          {/* <Link to={`/course/create/${id}`} style={{textDecoration:"none"}}> */}
          <Menu model={items} popup ref={menu} /> 
         <Button className=" primaryButt mt-2" rounded onClick={(e) => menu.current?.toggle(e)}> 
        <i className='pi pi-plus font-semibold'></i>
        <span className='text-sm ml-2 font-semibold'>Create</span>
         </Button>
         {/* </Link> */}
        </div>
      } 
      
       {data  && <ClassWorkList data={data} user={user}/> }
       
    </div>
  )
}

export default ClassWork