import mongoose, {Schema,model} from "mongoose"

const teachersSchema = new Schema(
    {
        course:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'courses'
        },
        teachers:[mongoose.Types.ObjectId]
    },
)

const Teachers = model("Teachers",teachersSchema,"teachers")

export default Teachers