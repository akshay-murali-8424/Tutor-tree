import { useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { useGetUserAndCoursesQuery } from "../../redux/Features/api/apiSlice";
import { CourseInterface } from "../../Types/CourseInterface";
        

function ToReview() {
  const { data, isLoading, isFetching,isSuccess,error } = useGetUserAndCoursesQuery()
  let courses:CourseInterface[] = []

  if(isSuccess)
    courses = data.coursesAsTeacher

  const [selectedClass, setSelectedClass] = useState(null);

  if(isSuccess){
    return (
      <div className="lg:w-5 mx-auto my-5 ">
       <div>
       <div className="card flex">
              <Dropdown value={selectedClass} onChange={(e) => setSelectedClass(e.value)} options={courses} optionLabel="name" 
                  placeholder="All Classes" className="w-full  md:w-16rem" />
       </div>
       </div>
      </div>
    )
  }else if(isLoading||isFetching){
    return(
      <span>Progress</span>
    )
  }else{
    console.log(error)
    return(
      <div></div>
    )
  }
}

export default ToReview