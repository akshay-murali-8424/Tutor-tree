import { UserRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/userRepositoryMongoDB"

export const userDbRepository=(repository:ReturnType<UserRepositoryMongoDB>)=>{

  const getUserByEmail=async(email:string)=>await repository.getUserByEmail(email)
  
  const addUser = async (user:{firstName:string,lastName:string,email:string,password:string})=>await repository.addUser(user)

  const getUserById = async(id:string)=> await repository.getUserById(id)

  return {
    getUserByEmail,
    addUser,
    getUserById
  }
}

export type UserDbInterface = typeof userDbRepository