import Students from "../models/studentsModel"

export const studentsRepositoryMongoDB=()=>{
    const addStudent=async(courseId:string,studentId:string)=>{
      await Students.updateOne({course:courseId},{
        $addToSet:{students:studentId}
      },{upsert:true})
    }

    return {
        addStudent
    }
}

export type StudentsRepositoryMongoDB= typeof studentsRepositoryMongoDB

