import { StudentsDbInterface } from "../../repositories/studentsDbRepository";
import { TeachersDbInterface } from "../../repositories/teachersDbRepository";

export const getStudentsAndTeachers = async(
    courseId:string,
    dbRepositoryTeachers:ReturnType<TeachersDbInterface>,
    dbRepositoryStudents: ReturnType<StudentsDbInterface>)=>{
     
    const teachers = await dbRepositoryTeachers.getTeachers(courseId)
    const students = await dbRepositoryStudents.getStudents(courseId)

    return {
        teachers,
        students
    }
}