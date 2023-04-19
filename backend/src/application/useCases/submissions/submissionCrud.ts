import { SubmissionDbInterface } from "../../repositories/submissionDbRepository";
import { CloudServiceInterface } from "../../services/cloudServiceInterface";

export const createNewSubmission = async (
  student: string,
  classWork: string,
  files: Express.Multer.File[],
  cloudService: ReturnType<CloudServiceInterface>,
  dbRepositorySubmission: ReturnType<SubmissionDbInterface>
) => {

  const attachments = await Promise.all(
    files.map(async (file) => {
      const { Key } = await cloudService.upload(file);
      return Key;
    })
  );
  await dbRepositorySubmission.postSubmission(student,attachments,classWork)
};


export const getSubmissionsByWork = async (dbRepositorySubmission:ReturnType<SubmissionDbInterface>,classWorkId:string)=> 
await dbRepositorySubmission.getSubmissions(classWorkId)


export const getSubmissionById = async(dbRepositorySubmission:ReturnType<SubmissionDbInterface>,classWorkId:string,userId:string)=>
await dbRepositorySubmission.getSubmission(userId,classWorkId)

export const returnWorkSubmissions = async(submissions:string[],dbRepositorySubmissions:ReturnType<SubmissionDbInterface>)=>
dbRepositorySubmissions.returnSubmissions(submissions)


export const setMark = async(submissionId:string,mark:number,dbRepositorySubmissions:ReturnType<SubmissionDbInterface>)=>
dbRepositorySubmissions.setMark(submissionId,mark)
