import mongoose, {Schema,model} from "mongoose"

const teachersSchema = new Schema(
    {
        course:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Course'
        },
        teachers:{
            type:[mongoose.Types.ObjectId],
            ref:'User'
        }
    },
)

const Teachers = model("Teachers",teachersSchema,"teachers")

export default Teachers