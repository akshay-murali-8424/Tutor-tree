import { ClassWorkInterface } from "../../../types/classWorkInterface";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
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
        attachments.map(async(attachment)=>
            await cloudService.upload(attachment)
        )
      )
    }
    const students:any = await dbRepositoryStudents.getStudentIds(courseId)
    if(!students)
      throw new AppError("there are no students in the class",HttpStatus.NOT_ACCEPTABLE)
    classWorks.assigned = students.length
    const {_id,dueDate} =await dbRepositoryClassWork.createWork(classWorks)
    students?.forEach((student:any)=>{
         student.classWork = _id
         student.course = courseId
         student.dueDate = dueDate
    })
    await dbRepositorySubmissions.createSubmissions(students)
}

export const getAllClassWorks = async(courseId:string,dbRepositoryClassWork:ReturnType<ClassWorkDbRepository>)=>
await dbRepositoryClassWork.getAll(courseId)

export const getClassWork = async(id:string,dbRepositoryClassWork:ReturnType<ClassWorkDbRepository>)=>
await dbRepositoryClassWork.getOne(id)