import Teachers from "../models/teachersModel"

export const teachersRepositoryMongoDb=()=>{
   const addTeacher=async(courseId:string,teacherId:string)=>{
   await Teachers.updateOne({course:courseId},{
        $push:{teachers:teacherId}
      },{upsert:true})
   }

   return {
    addTeacher
   }
}

export type TeachersRepositoryMongoDb = typeof teachersRepositoryMongoDb