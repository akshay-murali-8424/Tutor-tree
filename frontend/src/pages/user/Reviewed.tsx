import { useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import {  useGetTeacherReviewedWorksQuery, useGetUserAndCoursesQuery } from "../../redux/Features/api/apiSlice";
import { CourseInterface } from "../../Types/CourseInterface";
import { useSearchParams } from "react-router-dom";
import ClassWorkList from "../../components/Course/classWorkList/ClassWorkList";
        

function Reviewed() {
  const { data, isLoading, isFetching,isSuccess,error } = useGetUserAndCoursesQuery()
  let courses:CourseInterface| {name:string,_id:string}[]  = []
  const [searchParams,setSearchParams] = useSearchParams()
  const classWorkId = searchParams.get("course")

  const {data:classWorks,isSuccess:isClassWorkSuccess} = useGetTeacherReviewedWorksQuery({id:classWorkId})
  if(isClassWorkSuccess)
   console.log(classWorks)

  if(isSuccess)
    courses = data.coursesAsTeacher

  const [selectedClass, setSelectedClass] = useState(null);

  if(isSuccess){
    return (
      <div className="lg:w-5 mx-auto my-5 ">
       <div>
       <div className="card flex">
              <Dropdown value={selectedClass} onChange={(e) => {
                setSelectedClass(e.value)
                setSearchParams({["course"]: e.value._id}
                )
              }
              } options={courses} optionLabel="name" 
                  placeholder="All Classes" className="w-full  md:w-16rem" />
       </div>
      {classWorks&& <ClassWorkList data={classWorks} user="teacher"/> }
       </div>
      </div>
    )
  }else if(isLoading||isFetching){
    return(
      <span>Progress</span>
    )
  }else{
    
    return(
      <div></div>
    )
  }
}

export default Reviewed