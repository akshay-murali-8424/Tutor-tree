import { GroupMessageRepositoryMongoDb } from "../../frameworks/database/mongoDb/repositories/groupMessageRepositoryMongoDb"

export const groupMessageDbRepository = (repository:ReturnType<GroupMessageRepositoryMongoDb>) =>{

    const getMessages = async(course:string) => await repository.getMessages(course)

    return {
        getMessages
    }
}

export type GroupMessageDbInterface = typeof groupMessageDbRepository
