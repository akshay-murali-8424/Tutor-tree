import { ProgressSpinner } from 'primereact/progressspinner';
import { useParams } from 'react-router-dom'
import AnnouncementTab from '../../components/Course/announcementTab/AnnouncementTab';
import ClassWorkList from '../../components/Course/classWorkList/ClassWorkList';
import CourseTitleCard from '../../components/Course/CourseTitleCard/CourseTitleCard';
import ReferralCode from '../../components/Course/referalCode/ReferralCode';
import { useGetClassWorksQuery, useGetCourseQuery } from '../../redux/Features/api/apiSlice';

function Stream() {
  let {id}=useParams<string>()
  const { data, isLoading, isFetching, isSuccess, isError, error, refetch } = useGetCourseQuery({id})
  const { data:classWorksData,isLoading:isClassWorkLoading,isFetching:isClassWorkFetching } = useGetClassWorksQuery({id})
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

      <div className='grid mx-auto' style={{justifyContent:"space-between", width: "59.49%"}}>
        <div className='col-3 '>
        <ReferralCode refCode={data.referralCode}/>
        </div>
        <div className='col-9'>
       <AnnouncementTab/>
       {classWorksData&&!isClassWorkLoading &&<ClassWorkList data={classWorksData} user="teacher"/> }
        </div>
      </div>
      </>
    )
  }else{
    refetch()
    return null
  }
}

export default Stream