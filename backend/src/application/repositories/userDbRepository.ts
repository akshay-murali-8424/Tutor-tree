import { UserRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/userRepositoryMongoDB"

export const userDbRepository=(repository:ReturnType<UserRepositoryMongoDB>)=>{

  const getUserByEmail=async(email:string)=>await repository.getUserByEmail(email)
  
  const addUser = async (user:{firstName:string,lastName:string,email:string,password?:string})=>await repository.addUser(user)

  const getUserById = async(id:string)=> await repository.getUserById(id)

  const addCourseAsStudent = async(id:string,courseId:string)=>await repository.addCourseAsStudent(id,courseId)

  const addCourseAsTeacher = async(id:string,courseId:string)=>await repository.addCourseAsTeacher(id,courseId)

  const isUserTeacher = async(id:string,courseId:string)=>await repository.isUserTeacher(id,courseId)

  const isUserStudent = async(id:string,courseId:string)=>await repository.isUserStudent(id,courseId)

  const getUser = async(id:string) => await repository.getUser(id)

  return {
    getUserByEmail,
    addUser,
    getUserById,
    addCourseAsStudent,
    addCourseAsTeacher,
    isUserTeacher,
    isUserStudent,
    getUser
  }
}

export type UserDbInterface = typeof userDbRepository