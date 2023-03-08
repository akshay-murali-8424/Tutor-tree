import { CourseRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/courseRepositoryMongoDB"

export const courseDbRepository=(repository:ReturnType<CourseRepositoryMongoDB>)=>{

    const addNewCourse=async(name:string,section:string,subject:string,createdBy:string,referralCode:string)=>
        await repository.addNewCourse(name,section,subject,createdBy,referralCode)
    

    const getCourse=async(id:string)=>await repository.getCourse(id)

    const getCourseByRefCode=async(referralCode:string)=>await repository.getCourseByRefCode(referralCode)

    const editCourse=async(id:string,name:string,section:string,subject:string)=>{
        await repository.editCourse(id,name,section,subject)
    }

    return {
        addNewCourse,
        getCourse,
        getCourseByRefCode,
        editCourse
    }
     
}

export type CourseDbInterface = typeof courseDbRepository