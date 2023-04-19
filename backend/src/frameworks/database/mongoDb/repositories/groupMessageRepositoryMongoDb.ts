import GroupMessage from "../models/groupMessageModel"

export const groupMessageRepositoryMongoDb = () =>{

    const addMessage = async(user:string,course:string,message:string) =>
    (await GroupMessage.create({user,course,message})).populate('user',['firstName','lastName','color'])

    const getMessages = async(course:string)=>
    await GroupMessage.find({course})

    return {
        addMessage,
        getMessages
    }
}

export type GroupMessageRepositoryMongoDb = typeof groupMessageRepositoryMongoDb
