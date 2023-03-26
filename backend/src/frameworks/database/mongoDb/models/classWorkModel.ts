import mongoose, {Schema,model} from "mongoose"

const classWorkSchema = new Schema(
    {
        title:{
            type:String,
            required: [true,"please add a password"]
        },
        description:String,
        totalMark:Number,
        course:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Course'
        },
        postedOn:{
            type:Date,
            default:Date.now
        },
        dueDate:Date,
        attachments:[String],
        assignedBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    },
)
const ClassWork = model("ClassWork",classWorkSchema,"classWorks")
export default ClassWork