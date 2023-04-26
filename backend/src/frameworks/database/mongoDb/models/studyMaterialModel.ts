import mongoose, {Schema,model} from "mongoose"

const attachmentSchema = new Schema(
    {
        name:String,
        key:String
    }
)

const studyMaterialSchema = new Schema(
    {
        title:{
            type:String,
            required: [true,"please add a title"]
        },
        description:String,
        course:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Course'
        },
        postedOn:{
            type:Date,
            default:Date.now
        },
        attachments:[attachmentSchema],
        assignedBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
    },
)
const Material = model("Material",studyMaterialSchema,"materials")
export default Material