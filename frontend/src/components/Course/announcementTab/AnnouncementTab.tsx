import { Avatar } from "primereact/avatar"
import { useGetUserAndCoursesQuery } from "../../../redux/Features/api/apiSlice"

function AnnouncementTab() {
  const { data, isLoading, isFetching, isSuccess, isError, error, refetch } = useGetUserAndCoursesQuery()
  
  return (

    <div className='flex border-round announceTab' style={{border: '0.0625rem solid #dadce0'}}>
      <div className="p-2">
      <Avatar
          label={data?.firstName[0]}
          className="primaryButt mr-2"
          shape="circle"
          style={{ color: "white" }}
          />
           {data && <span className='textGray hoverPrimary cursor-pointer text-sm pl-2'>
            Announce something to your class
           </span> }
      </div>
     </div>
  )
}

export default AnnouncementTab