import Students from "../models/studentsModel"

export const studentsRepositoryMongoDB=()=>{
    const addStudent=async(courseId:string,studentId:string)=>{
      await Students.updateOne({course:courseId},{
        $addToSet:{students:studentId}
      },{upsert:true})
    }

    const getStudents=async(courseId:string)=>
      await Students.findOne({course:courseId}).populate('students')
    

    return {
        addStudent,
        getStudents
    }
}

export type StudentsRepositoryMongoDB= typeof studentsRepositoryMongoDB

