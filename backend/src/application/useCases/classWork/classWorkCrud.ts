import { ClassWorkInterface } from "../../../types/classWorkInterface";
import { ClassWorkDbRepository } from "../../repositories/classWorkDbRepository";
import { CloudServiceInterface } from "../../services/cloudServiceInterface";

export const createWork = async(classWorks:ClassWorkInterface,
    attachments:Express.Multer.File[] | undefined, cloudService:ReturnType<CloudServiceInterface>,
    dbRepositoryClassWork:ReturnType<ClassWorkDbRepository>,assignedBy:string) =>{

    classWorks.assignedBy = assignedBy

    if(attachments){
        classWorks.attachments = await Promise.all(
        attachments.map(async(attachment)=>{
            const {Key} = await cloudService.upload(attachment)
            return Key
        })
      )
    }
    
    dbRepositoryClassWork.createWork(classWorks)
}