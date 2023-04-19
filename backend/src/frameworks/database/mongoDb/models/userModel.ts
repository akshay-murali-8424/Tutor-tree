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
        },
        coursesAsTeacher:{
          type:[mongoose.Types.ObjectId],
          ref:'Course'
        },
        coursesAsStudent:{
          type:[mongoose.Types.ObjectId],
          ref:'Course'
        },
        isGoogleUser:{
            type:Boolean,
            default:false
        },
        color:{
            type:String,
        }
    },
)

const User = model("User",userSchema,"users")

export default User