import { ClassWorkInterface } from "../../../../types/classWorkInterface"
import ClassWork from "../models/classWorkModel"

export const classWorkRepositoryMongoDb = () =>{

    const createWork = async(classWork:ClassWorkInterface)=> await ClassWork.create(classWork)

    return {
        createWork
    }
}

export type ClassWorkRepositoryMongoDb = typeof classWorkRepositoryMongoDb