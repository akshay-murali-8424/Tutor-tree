
import { useParams } from 'react-router-dom';
import ShowAssignment from '../../Student/Assignment/ShowAssignment';
import { useGetClassWorkQuery } from '../../../redux/Features/api/classWorkApiSlice';

function SubmissionReport() {
  const { courseId,id } = useParams<string>();


  const {data,isLoading,isFetching,isSuccess} = useGetClassWorkQuery({id,courseId})

  if(isSuccess){
    return (
      <div className='p-5'>
        <ShowAssignment data={data} mt={0}/>
        <div className='flex '>
           <div className='lg:w-1  p-3 mt-4'>
                <div className='flex justify-content-center'><span className='text-3xl'>{data.assigned}</span> <br/></div> 
                <div><span className='text-sm flex justify-content-center'>assigned</span></div>
           </div>
           <div className='lg:w-1  p-3 mt-4'>
                <div className='flex justify-content-center'><span className='text-3xl'>{data.submitted}</span> <br/></div> 
                <div><span className='text-sm flex justify-content-center'>submitted</span></div>
           </div>
           <div className='lg:w-1  p-3 mt-4'>
                <div className='flex justify-content-center'><span className='text-3xl'>{data.returned}</span> <br/></div> 
                <div><span className='text-sm flex justify-content-center'>returned</span></div>
           </div>
        </div>
      </div>
    )
  }else{
    return(
      <></>
    )
  }
}

export default SubmissionReport 