import mongoose, {Schema,model} from "mongoose"

const assignmentSchema = new Schema(
    {
        name:String,
        key:String
    }
)

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
        attachments:[assignmentSchema],
        assignedBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    },
)
const ClassWork = model("ClassWork",classWorkSchema,"classWorks")
export default ClassWork