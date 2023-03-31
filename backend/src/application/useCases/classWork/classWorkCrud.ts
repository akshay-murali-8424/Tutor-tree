import { ClassWorkInterface } from "../../../types/classWorkInterface";
import { ClassWorkDbRepository } from "../../repositories/classWorkDbRepository";
import { StudentsDbInterface } from "../../repositories/studentsDbRepository";
import { SubmissionDbInterface } from "../../repositories/submissionDbRepository";
import { CloudServiceInterface } from "../../services/cloudServiceInterface";

export const createWork = async(classWorks:ClassWorkInterface,
    attachments:Express.Multer.File[] | undefined, cloudService:ReturnType<CloudServiceInterface>,
    dbRepositoryClassWork:ReturnType<ClassWorkDbRepository>,assignedBy:string,courseId:string,
    dbRepositoryStudents:ReturnType<StudentsDbInterface>,dbRepositorySubmissions:ReturnType<SubmissionDbInterface>) =>{


    classWorks.course = courseId
    classWorks.assignedBy = assignedBy
    if(attachments){
        classWorks.attachments = await Promise.all(
        attachments.map(async(attachment)=>{
            const {Key} = await cloudService.upload(attachment)
            return Key
        })
      )
    }
    const students:any = await dbRepositoryStudents.getStudentIds(courseId)
    const {_id} =await dbRepositoryClassWork.createWork(classWorks)
    students?.forEach((student:any)=>{
         student.classWork = _id
    })
    await dbRepositorySubmissions.createSubmissions(students)
}

export const getAllClassWorks = async(courseId:string,dbRepositoryClassWork:ReturnType<ClassWorkDbRepository>)=>
await dbRepositoryClassWork.getAll(courseId)

export const getClassWork = async(id:string,dbRepositoryClassWork:ReturnType<ClassWorkDbRepository>)=>
await dbRepositoryClassWork.getOne(id)