import { SubmissionsRepositoryMongoDb } from "../../frameworks/database/mongoDb/repositories/submissionsRepositoryMongoDb";
import { SubmissionInterface } from "../../types/submissionInterface";

export const submissionDbRepository = (repository:ReturnType<SubmissionsRepositoryMongoDb>) => {

     const createSubmission =async (submission:SubmissionInterface) =>await repository.createSubmission(submission)

     return {
        createSubmission
     }
}

export type SubmissionDbInterface = typeof submissionDbRepository