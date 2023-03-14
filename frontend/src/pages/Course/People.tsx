import { ProgressSpinner } from 'primereact/progressspinner';
import { useParams } from 'react-router-dom'
import PeopleList from '../../components/Course/PeopleList/PeopleList';
import { useGetPeopleQuery } from '../../redux/Features/api/apiSlice';


function People() {
  let {id}=useParams<string>()
  const { data, isLoading, isFetching, isSuccess, isError, error, refetch } = useGetPeopleQuery({id})

  if(isError){
    console.log(error)
  }
  if(isFetching||isLoading){
    return(
      <div className="flex justify-content-center" style={{marginTop:"16rem"}}>
      <ProgressSpinner />
       </div>
    )
  }else if(isSuccess){
    return (
       <div className='lg:w-5 mx-auto'>
         {data.teachers?.teachers && <PeopleList title='Teachers' members={data.teachers.teachers}/>}
         {data.students?.students && <PeopleList title='Students' members={data.students.students}/>}
       </div>
    )
  }else{
    refetch()
    return null
  }
}

export default People