import {  useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useGetUserAndCoursesQuery } from '../../redux/Features/api/apiSlice'
import { selectuserAuth } from '../../redux/Features/reducers/userAuthSlice'
import { ProgressSpinner } from 'primereact/progressspinner';
import ClassCard from '../../components/User/ClassCard/ClassCard'
import EmptyHome from '../../components/User/EmptyHome.tsx/EmptyHome';
import NavBar from '../../components/User/UserNavBar/NavBar';

function Home() {
  const {token}=useSelector(selectuserAuth)
  const { data, isLoading, isFetching, isSuccess, isError, error, refetch } = useGetUserAndCoursesQuery()
  if(token){
    if(isLoading || isFetching){
      return(
        <div className="flex justify-content-center" style={{marginTop:"16rem"}}>
            <ProgressSpinner />
        </div>
      )
    }else if(!data?.coursesAsStudent.length && !data?.coursesAsTeacher.length){
      return(
        <>
        <NavBar course={false}/>
        <EmptyHome/>
        </>
      )
    }else{
      return (
        <>
        <NavBar course={false}/>
        <ClassCard data={data}/>
        </>
      )
    }
  }else{
    return(
        <Navigate to={'/login'}/>
    )
  }
}

export default Home