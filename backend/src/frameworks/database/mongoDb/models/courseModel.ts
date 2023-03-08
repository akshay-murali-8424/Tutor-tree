import mongoose, {Schema,model} from "mongoose"

const courseSchema = new Schema(
    {
        name:{
            type:String,
            required: [true,"please add a name"]
        },
        section:{
            type:String,
            required: [true,"please add a section"]
        },
        subject:{
            type:String,
            required: [true,"please add a subject"],
        },
        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'users'
        },
        referralCode:{
           type:String,
           unique:true
        }
    },
)

const Course = model("Course",courseSchema,"courses")

export default Course