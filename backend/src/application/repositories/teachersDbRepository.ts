import { TeachersRepositoryMongoDb } from "../../frameworks/database/mongoDb/repositories/teachersRepositoryMongoDB";

export const teachersDbRepository=(repository:ReturnType<TeachersRepositoryMongoDb>)=>{
  
    const addTeacher=async(courseId:string,teacherId:string)=> await repository.addTeacher(courseId,teacherId)

    return {
        addTeacher
    }
}

export type TeachersDbRepository = typeof teachersDbRepository