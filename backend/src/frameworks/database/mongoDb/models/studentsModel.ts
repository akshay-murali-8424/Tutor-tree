import mongoose, {Schema,model} from "mongoose"

const studentsSchema = new Schema(
    {
        course:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Course'
        },
        students:{
          type:[mongoose.Types.ObjectId],
          ref:'User'
        }
    },
)

const Students = model("Students",studentsSchema,"students")

export default Students