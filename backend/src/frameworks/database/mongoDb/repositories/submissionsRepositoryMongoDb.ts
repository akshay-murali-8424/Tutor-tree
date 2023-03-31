import { SubmissionInterface } from "../../../../types/submissionInterface"
import Submissions from "../models/submissionModel"

export const submissionsRepositoryMongoDb = () =>{

    const createSubmissions = async(submissions:any) => await Submissions.insertMany(submissions)

    const postSubmission = async(userId:string,attachments:string[]) => await Submissions.updateOne({userId},{
        $set:{
            attachments,
            status:"submitted"
        }
    })

    const getSubmissions = async(classWork:string) => await Submissions.find({classWork}).populate(['userId','classWork'])

    const getSubmission = async(submissionId:string) => await Submissions.findById(submissionId).populate(['userId','classWork'])

    const returnSubmissions = async(submissionId:string,mark:string) => 
    await Submissions.updateOne({_id:submissionId},{
        $set:{
            status:"returned"
        }
    })

    return {
        createSubmissions,
        postSubmission,
        getSubmissions,
        returnSubmissions,
        getSubmission
    }
}

export type SubmissionsRepositoryMongoDb = typeof submissionsRepositoryMongoDb