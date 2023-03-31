import mongoose, {Schema,model} from "mongoose"

const studentSchema = new Schema(
    {
        userId:{
         type:mongoose.Schema.Types.ObjectId,
         ref:'User'
        }
    },
    { _id : false }
)

const studentsSchema = new Schema(
    {
        course:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Course'
        },
        students:[studentSchema]
    },
)

const Students = model("Students",studentsSchema,"students")

export default Students