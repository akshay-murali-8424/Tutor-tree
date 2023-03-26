import { StudentsRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/studentsRepositoryMongoDB";

export const studentsDbRepository=(repository:ReturnType<StudentsRepositoryMongoDB>)=>{

    const addStudent=async(courseId:string,studentId:string)=>await repository.addStudent(courseId,studentId)

    const getStudents=async(courseId:string)=> await repository.getStudents(courseId)

    const getStudentIds =  async(courseId:string) => await repository.getStudentIds(courseId)

    return {
        addStudent,
        getStudents,
        getStudentIds
    }
}

export type StudentsDbInterface = typeof studentsDbRepository