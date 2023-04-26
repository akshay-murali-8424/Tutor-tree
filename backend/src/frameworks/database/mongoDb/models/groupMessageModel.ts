import { Schema, model } from "mongoose";

const groupMessageSchema = new Schema(
    {
        message: {
           type:String,
           required:true
        },
        user:{
            type:Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        course:{
            type:Schema.Types.ObjectId,
            ref:'Course',
            required:true
        },
        sentedTime:{
            type:Date,
            default:Date.now
        }
    }
)




groupMessageSchema.pre(/^find/,function(next){
    this.populate('user',['firstName','lastName','color'])
    next()
})

const GroupMessage = model("GroupMessage",groupMessageSchema)

export default GroupMessage