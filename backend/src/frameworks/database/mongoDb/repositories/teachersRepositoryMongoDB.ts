import Teachers from "../models/teachersModel"

export const teachersRepositoryMongoDb=()=>{
   const addTeacher=async(courseId:string,teacherId:string)=>{
   await Teachers.updateOne({course:courseId},{
        $addToSet:{teachers:{
         userId:teacherId
       }}
      },{upsert:true})
   }

   const getTeachers=async(courseId:string)=>
      await Teachers.findOne({course:courseId}).populate('teachers.userId')


   return {
    addTeacher,
    getTeachers
   }
}

export type TeachersRepositoryMongoDb = typeof teachersRepositoryMongoDb