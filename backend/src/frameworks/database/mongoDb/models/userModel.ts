import mongoose, {Schema,model} from "mongoose"

const userSchema = new Schema(
    {
        firstName:{
            type:String,
            required: [true,"please add a first name"]
        },
        lastName:{
            type:String,
            required: [true,"please add a first name"]
        },
        email:{
            type:String,
            required: [true,"please add a email"],
            unique:true
        },
        password:{
            type:String,
            required: [true,"please add a password"]
        },
        coursesAsTeacher:[mongoose.Types.ObjectId],
        coursesAsStudent:[mongoose.Types.ObjectId]
    },
)

const User = model("User",userSchema,"users")

export default User