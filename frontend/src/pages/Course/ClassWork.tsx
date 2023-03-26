import { Button } from 'primereact/button'
import { Link, useParams } from 'react-router-dom'
import ClassWorkList from '../../components/Course/classWorkList/ClassWorkList'
import { useGetClassWorksQuery, useGetUserAndCoursesQuery } from '../../redux/Features/api/apiSlice'

function ClassWork() {
  const {id}=useParams<string>()
  const { data:userData, isLoading:userIsLoading, isFetching:userIsFetching, isSuccess:userIsSuccess, isError:userIsError, error:userError, refetch:userRefetch } = useGetUserAndCoursesQuery()
  const { data, isLoading, isFetching, isSuccess, isError, error, refetch } = useGetClassWorksQuery({id})

  let user= "student"

  userData?.coursesAsTeacher.forEach((course)=>{
    if(course._id===id){
      user="teacher"
    }
   })

  return (
    <div className='lg:w-5 mx-auto my-5'>
      {user==="teacher" &&
        <div>
          <Link to={`/course/create/${id}`} style={{textDecoration:"none"}}>
         <Button className=" primaryButt mt-2" rounded> 
        <i className='pi pi-plus font-semibold'></i>
        <span className='text-sm ml-2 font-semibold'>Create</span>
         </Button>
         </Link>
        </div>
      } 
       <div className='mt-4'>
       {data && <ClassWorkList data={data} user={user}/> }
        </div> 
    </div>
  )
}

export default ClassWork