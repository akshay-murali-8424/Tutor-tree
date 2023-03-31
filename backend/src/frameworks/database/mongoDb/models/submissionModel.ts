import mongoose, { model, Schema } from "mongoose";

const submissionSchema = new Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
        },
        classWork:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'ClassWork'
        },
        attachments:[String],
        status:{
            type:String,
            enum:["assigned","submitted","returned"],
            default:"assigned"
        },
        mark:Number
    }
)

const Submissions = model("Submissions",submissionSchema,"submissions")

export default Submissions
