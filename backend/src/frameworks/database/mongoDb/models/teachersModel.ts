import mongoose, {Schema,model} from "mongoose"

const teacherSchema = new Schema(
    {
        userId:{
         type:mongoose.Schema.Types.ObjectId,
         ref:'User'
        }
    },
    { _id : false }
)

const teachersSchema = new Schema(
    {
        course:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Course'
        },
        teachers:[teacherSchema]
    },
)

const Teachers = model("Teachers",teachersSchema,"teachers")

export default Teachers