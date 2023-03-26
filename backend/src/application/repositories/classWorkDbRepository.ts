import { ClassWorkRepositoryMongoDb } from "../../frameworks/database/mongoDb/repositories/classWorkRepositoryMongoDb";
import { ClassWorkInterface } from "../../types/classWorkInterface";

export const classWorkDbRepository = (repository:ReturnType<ClassWorkRepositoryMongoDb>)=>{

    const createWork = async (classWork:ClassWorkInterface)=> await repository.createWork(classWork)

    const getAll = async(courseId:string) => await repository.getAll(courseId)

    const getOne = async(id:string) => await repository.getOne(id)

    return {
        createWork,
        getAll,
        getOne
    }

}

export type ClassWorkDbRepository = typeof classWorkDbRepository