import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useGetUserAndCoursesQuery } from '../../redux/Features/api/apiSlice'
import { selectuserAuth } from '../../redux/Features/reducers/userAuthSlice'
import { ProgressSpinner } from 'primereact/progressspinner';
import ClassCard from '../../components/User/ClassCard/ClassCard'
import { setUserCourses } from '../../redux/Features/reducers/userCoursesSlice'

function Home() {
  const dispatch = useDispatch()
  const {token}=useSelector(selectuserAuth)
  const { data, isLoading, isFetching, isSuccess, isError, error, refetch } = useGetUserAndCoursesQuery()
  if(token){
    if(isLoading || isFetching){
      return(
        <div className="flex justify-content-center" style={{marginTop:"16rem"}}>
            <ProgressSpinner />
        </div>
      )
    }else {
      if(data){
        dispatch(setUserCourses(data))
      }
      return (
        <ClassCard data={data}/>
      )
    }
  }else{
    return(
        <Navigate to={'/login'}/>
    )
  }
}

export default Home