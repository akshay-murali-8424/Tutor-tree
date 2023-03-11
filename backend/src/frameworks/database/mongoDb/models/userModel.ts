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
        coursesAsTeacher:{
          type:[mongoose.Types.ObjectId],
          ref:'Course'
        },
        coursesAsStudent:{
          type:[mongoose.Types.ObjectId],
          ref:'Course'
        }
    },
)

const User = model("User",userSchema,"users")

export default User