import { GroupMessageDbInterface } from "../../repositories/groupMessageDbRepository";

export const getMessages = async(course:string,dbRepositoryGroupMessages:ReturnType<GroupMessageDbInterface>) => 
await dbRepositoryGroupMessages.getMessages(course)
