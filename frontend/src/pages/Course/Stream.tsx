import { ProgressSpinner } from 'primereact/progressspinner';
import { useParams } from 'react-router-dom'
import CourseTitleCard from '../../components/Course/CourseTitleCard/CourseTitleCard';
import ReferralCode from '../../components/Course/referalCode/ReferralCode';
import { useGetCourseQuery } from '../../redux/Features/api/apiSlice';

function Stream() {
  let {id}=useParams<string>()
  const { data, isLoading, isFetching, isSuccess, isError, error, refetch } = useGetCourseQuery({id})
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
      <>
      <CourseTitleCard className={data.name} section={data.section}/>
      <div className='flex lg:w-7 mx-auto justify-content-between'>
        <ReferralCode refCode={data.referralCode}/>
        {/* <div className='lg:w-10 flex justify-content-centre border-round bg-indigo-500'>
           Stream
        </div> */}
      </div>
      </>
    )
  }else{
    refetch()
    return null
  }
}

export default Stream