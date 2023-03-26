import { ClassWorkInterface } from "../../../../types/classWorkInterface"
import ClassWork from "../models/classWorkModel"

export const classWorkRepositoryMongoDb = () =>{

    const createWork = async(classWork:ClassWorkInterface)=> await ClassWork.create(classWork)

    const getAll = async(courseId:string)=> await ClassWork.find({course:courseId}).sort({postedOn:-1})

    const getOne = async(id:string) => await ClassWork.findById(id).populate('assignedBy')

    return {
        createWork,
        getAll,
        getOne
    }
}

export type ClassWorkRepositoryMongoDb = typeof classWorkRepositoryMongoDb