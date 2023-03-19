import { ClassWorkRepositoryMongoDb } from "../../frameworks/database/mongoDb/repositories/classWorkRepositoryMongoDb";
import { ClassWorkInterface } from "../../types/classWorkInterface";

export const classWorkDbRepository = (repository:ReturnType<ClassWorkRepositoryMongoDb>)=>{

    const createWork = async (classWork:ClassWorkInterface)=> await repository.createWork(classWork)

    return {
        createWork 
    }

}

export type ClassWorkDbRepository = typeof classWorkDbRepository