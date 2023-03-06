import mongoose, {Schema,model} from "mongoose"

const studentsSchema = new Schema(
    {
        course:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'courses'
        },
        students:[mongoose.Types.ObjectId]
    },
    {
        timestamps:true
    }
)

const Students = model("Students",studentsSchema,"students")

export default Students