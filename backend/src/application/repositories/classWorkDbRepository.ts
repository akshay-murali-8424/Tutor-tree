import { ClassWorkRepositoryMongoDb } from "../../frameworks/database/mongoDb/repositories/classWorkRepositoryMongoDb";
import { ClassWorkInterface } from "../../types/classWorkInterface";

export const classWorkDbRepository = (repository:ReturnType<ClassWorkRepositoryMongoDb>)=>{

    const createWork = async (classWork:ClassWorkInterface)=> await repository.createWork(classWork)

    const getAll = async(courseId:string) => await repository.getAll(courseId)

    const getOne = async(id:string) => await repository.getOne(id)

    const decrementAssignedCount = async(id:string) => await repository.decrementAssignedCount(id)

    const decrementSubmissionCount = async(id:string,count:number) => await repository.decrementSubmissionCount(id,count)

    const getAllReviewed = async(courseIds:string[]) => await repository.getAllReviewed(courseIds)

    const getAllNotReviewed =async (courseIds:string[]) => await repository.getAllNotReviewed(courseIds)

    return {
        createWork,
        getAll,
        getOne,
        decrementAssignedCount,
        decrementSubmissionCount,
        getAllNotReviewed,
        getAllReviewed
    }

}

export type ClassWorkDbRepository = typeof classWorkDbRepository