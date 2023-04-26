import mongoose, { model, Schema } from "mongoose";

const assignmentSchema = new Schema(
    {
        name:String,
        key:String
    }
)

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
        course:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Course'
        },
        attachments:[assignmentSchema],
        status:{
            type:String,
            enum:["assigned","submitted","returned"],
            default:"assigned"
        },
        mark:Number,
        assignedDate:{
            type:Date,
            default:Date.now
        },
        dueDate:{
            type:Date
        }
    }
)

const Submissions = model("Submissions",submissionSchema,"submissions")

export default Submissions
