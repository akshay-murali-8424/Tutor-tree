import { SubmissionsRepositoryMongoDb } from "../../frameworks/database/mongoDb/repositories/submissionsRepositoryMongoDb";

export const submissionDbRepository = (repository:ReturnType<SubmissionsRepositoryMongoDb>) => {

     const createSubmissions =async (submissions:any) =>await repository.createSubmissions(submissions)

     const postSubmission = async(userId:string,attachments:{key:string,name:string}[],classWork:string) => await repository.postSubmission(userId,attachments,classWork)

     const getSubmissions = async(classWork:string) => await repository.getSubmissions(classWork)

     const getSubmission =async(userId:string,classWork:string) => await repository.getSubmission(userId,classWork)

     const returnSubmissions = async(submissionIds:string[]) => await repository.returnSubmissions(submissionIds)

     const setMark = async(submissionId:string,mark:number) => await repository.setMark(submissionId,mark)

     const getAllAssignedWorks = async(courseIds:string[],user:string)=>await repository.getAllAssignedWorks(courseIds,user)

     const getAllSubmittedWorks = async(courseIds:string[],user:string)=>await repository.getAllSubmittedWorks(courseIds,user)

     return {
        createSubmissions,
        postSubmission,
        getSubmissions,
        getSubmission,
        returnSubmissions,
        setMark,
        getAllAssignedWorks,
        getAllSubmittedWorks
     }
}

export type SubmissionDbInterface = typeof submissionDbRepository