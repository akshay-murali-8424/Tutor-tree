import {Schema,model} from "mongoose"

const adminSchema = new Schema(
    {
        email:{
            type:String,
            required: [true,"please add a email"],
            unique:true
        },
        password:{
            type:String,
            required: [true,"please add a password"]
        },
    },
)
const Admin = model("Admin",adminSchema,"admin")
export default Admin