import { SubmissionsRepositoryMongoDb } from "../../frameworks/database/mongoDb/repositories/submissionsRepositoryMongoDb";
import { SubmissionInterface } from "../../types/submissionInterface";

export const submissionDbRepository = (repository:ReturnType<SubmissionsRepositoryMongoDb>) => {

     const createSubmissions =async (submissions:any) =>await repository.createSubmissions(submissions)

     const postSubmission = async(userId:string,attachments:string[]) => await repository.postSubmission(userId,attachments)

     const getSubmissions = async(classWork:string) => await repository.getSubmissions(classWork)

     const getSubmission =async(submissionId:string) => await repository.getSubmission(submissionId)

     return {
        createSubmissions,
        postSubmission,
        getSubmissions,
        getSubmission
     }
}

export type SubmissionDbInterface = typeof submissionDbRepository