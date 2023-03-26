import Students from "../models/studentsModel"

export const studentsRepositoryMongoDB=()=>{
    const addStudent=async(courseId:string,studentId:string)=>{
      await Students.updateOne({course:courseId},{
        $addToSet:{students:studentId}
      },{upsert:true})
    }

    const getStudents=async(courseId:string)=>
    await Students.findOne({course:courseId}).populate('students')

    const getStudentIds = async(courseId:string)=>{
      const res = await Students.findOne({course:courseId})
      return res?.students
    }
    

    return {
        addStudent,
        getStudents,
        getStudentIds
    }
}

export type StudentsRepositoryMongoDB= typeof studentsRepositoryMongoDB

