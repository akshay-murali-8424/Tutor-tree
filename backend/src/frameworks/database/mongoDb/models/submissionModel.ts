import mongoose, { model, Schema } from "mongoose";

const submissionSchema = new Schema(
    {
        student:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            unique:true
        },
        classWork:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'ClassWork'
        },
        attachments:[String],
        submittedDate:{
            type:Date,
            default:Date.now
        }
    }
)

const Submissions = model("Submissions",submissionSchema,"submissions")

export default Submissions
