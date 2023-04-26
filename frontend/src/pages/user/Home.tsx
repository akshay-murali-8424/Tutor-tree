import {  useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { useGetUserAndCoursesQuery } from '../../redux/Features/api/apiSlice'
import { selectuserAuth } from '../../redux/Features/reducers/userAuthSlice'
import { ProgressSpinner } from 'primereact/progressspinner';
import ClassCard from '../../components/User/ClassCard/ClassCard'
import EmptyHome from '../../components/User/EmptyHome.tsx/EmptyHome';
import NavBar from '../../components/User/UserNavBar/NavBar';
import { Button } from 'primereact/button';

function Home() {
  const {token}=useSelector(selectuserAuth)
  const { data, isLoading, isFetching } = useGetUserAndCoursesQuery()
  
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
        <div className='p-2 flex'>
         {data.coursesAsTeacher.length!==0 && <div className='m-1'><Link to={"/t/to-review?course=all"} style={{textDecoration:"none"}}><Button className='textButt' text>
          <i className="pi pi-user-edit mr-2"></i>
             <span>To Review</span></Button></Link></div> }
          {data.coursesAsStudent.length!==0 && <div className='m-1' >
            <Link to={"/s/assigned"} style={{textDecoration:"none"}}>
            <Button className='textButt' text>
             <i className="pi pi-file-edit mr-2"></i>
             <span>To Do</span></Button> 
            </Link>
             </div>  } 
        </div>  
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