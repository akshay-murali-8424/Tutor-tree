import { SubmissionInterface } from "../../../../types/submissionInterface"
import Submissions from "../models/submissionModel"

export const submissionsRepositoryMongoDb = () =>{

    const createSubmission = async(submission:SubmissionInterface) => await Submissions.create(submission) 

    return {
        createSubmission
    }
}

export type SubmissionsRepositoryMongoDb = typeof submissionsRepositoryMongoDb