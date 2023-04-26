import { ClassWorkDbRepository } from "../../repositories/classWorkDbRepository";
import { SubmissionDbInterface } from "../../repositories/submissionDbRepository";
import { CloudServiceInterface } from "../../services/cloudServiceInterface";

export const createNewSubmission = async (
  student: string,
  classWork: string,
  files: Express.Multer.File[],
  cloudService: ReturnType<CloudServiceInterface>,
  dbRepositorySubmission: ReturnType<SubmissionDbInterface>,
  dbRepositoryClassWork: ReturnType<ClassWorkDbRepository>
 
) => {

  const attachments = await Promise.all(
    files.map(async (file) => 
      await cloudService.upload(file)
    )
  );
  await Promise.all([dbRepositorySubmission.postSubmission(student,attachments,classWork),
   dbRepositoryClassWork.decrementAssignedCount(classWork)])
};


export const getSubmissionsByWork = async (dbRepositorySubmission:ReturnType<SubmissionDbInterface>,classWorkId:string)=> 
await dbRepositorySubmission.getSubmissions(classWorkId)


export const getSubmissionById = async(dbRepositorySubmission:ReturnType<SubmissionDbInterface>,classWorkId:string,userId:string)=>
await dbRepositorySubmission.getSubmission(userId,classWorkId)

export const returnWorkSubmissions = async(
  classWork:string,
  submissions:string[],
  dbRepositorySubmissions:ReturnType<SubmissionDbInterface>,
  dbRepositoryClassWork:ReturnType<ClassWorkDbRepository>)=>{
  
  await Promise.all([dbRepositorySubmissions.returnSubmissions(submissions),
  dbRepositoryClassWork.decrementSubmissionCount(classWork,submissions.length)])
}


export const setMark = async(submissionId:string,mark:number,dbRepositorySubmissions:ReturnType<SubmissionDbInterface>)=>
await dbRepositorySubmissions.setMark(submissionId,mark)
