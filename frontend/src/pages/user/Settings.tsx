import NavBar from '../../components/User/UserNavBar/NavBar'
import { useGetUserAndCoursesQuery } from '../../redux/Features/api/apiSlice'

function Settings() {
 
  const { data, isLoading, isFetching } = useGetUserAndCoursesQuery()

  return (
    <div>
        <NavBar/>
        <div className='lg:w-4 mx-auto my-7 border-round p-5' style={{border: '0.0625rem solid #dadce0'}}>

            <div className='flex'>
           <div className='border-circle border-circle w-6rem h-6rem primaryBackground flex justify-content-center align-items-center'>
               <span className="text-5xl">{data?.firstName[0]}</span>
          </div>
          <div className='flex align-items-center ml-4'>
            <span className='accent text-4xl'>{data?.firstName +" " + data?.lastName}</span>
          </div>
          </div>

          <div className=' mt-7'>
             <h3 className='accent'>Personal Details</h3>
             <div className='flex gap-8'>

              <div>
             <div><span className='textGray'>Name</span></div> 
               <div><span className='accent'>{data?.firstName +" " + data?.lastName}</span></div>
              </div>

              <div>
             <div><span className='textGray'>Email</span></div> 
               <div><span className='accent'>{data?.email}</span></div>
              </div>
              
             </div>
          </div>
        </div>
    </div>
  )
}

export default Settings