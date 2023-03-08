import Course from "../models/courseModel"

export const courseRepositoryMongoDB=()=>{

   const addNewCourse=async(name:string,section:string,subject:string,createdBy:string,referralCode:string)=>{
    const {_id} = await Course.create({
      name,
      section,
      subject,
      createdBy,
      referralCode
     })
     return _id
   }

   const getCourse=async(id:string)=>await Course.findById(id)

   const getCourseByRefCode=async(referralCode:string)=>await Course.findOne({referralCode})
   
   const editCourse=async(id:string,name:string,section:string,subject:string)=>{
      await Course.findByIdAndUpdate(id,{
         name,
         section,
         subject
      })
   }

   return {
      addNewCourse,
      getCourse,
      getCourseByRefCode,
      editCourse
   }
}

export type CourseRepositoryMongoDB = typeof courseRepositoryMongoDB