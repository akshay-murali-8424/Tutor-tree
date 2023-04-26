import { ProgressSpinner } from 'primereact/progressspinner';
import { useParams } from 'react-router-dom'
import PeopleList from '../../components/Course/PeopleList/PeopleList';
import {  useGetUserAndCoursesQuery } from '../../redux/Features/api/apiSlice';
import { useGetPeopleQuery } from '../../redux/Features/api/courseApiSlice';


function People() {
  let {id}=useParams<string>()
  const { data, isLoading, isFetching, isSuccess, isError, error, refetch } = useGetPeopleQuery({id})
  const { data:userData, isLoading:userIsLoading, isFetching:userIsFetching, isSuccess:userIsSuccess, isError:userIsError, error:userError, refetch:userRefetch } = useGetUserAndCoursesQuery()

  let user:"teacher" | "student" | undefined
  
  if(id){
     userData?.coursesAsTeacher.forEach((course)=>{
      if(course._id===id){
        user="teacher"
      }
     })
     userData?.coursesAsStudent.forEach((course)=>{
      if(course._id===id){
        user="student"
      }
     })
  }

  if(isError){
    console.log(error)
  }
  if(isFetching||isLoading){
    return(
      <div className="flex justify-content-center" style={{marginTop:"16rem"}}>
      <ProgressSpinner />
       </div>
    )
  }else if(isSuccess && userIsSuccess){
    return (
       <div className='lg:w-5 mx-auto'>
         {user &&data.teachers?.teachers && <PeopleList title='Teachers' members={data.teachers.teachers} user={user}/>}
         {user==="teacher"&&data.students?.students && <PeopleList title='Students' members={data.students.students} user={user}/>}
         {user==="student"&&data.students?.students && <PeopleList title='Classmates' members={data.students.students} user={user}/>}
       </div>
    )
  }else{
    refetch()
    return null
  }
}

export default People