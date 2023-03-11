import { HttpStatus } from "../../../../types/httpStatus"
import UserInterface from "../../../../types/userInterface"
import AppError from "../../../../utils/appError"
import User from "../models/userModel"

export const userRepositoryMongoDB=()=>{

    const getUserByEmail=async(email:string)=>{
       const user:UserInterface | null=await User.findOne({email})
       return user
    }

    const addUser = async(user:{firstName:string,lastName:string,email:string,password:string})=> await User.create(user)

    const getUserById = async(id:string)=> await User.findById(id).populate(['coursesAsStudent','coursesAsTeacher'])

    const addCourseAsTeacher = async(_id:string,courseId:string)=>{
        const {modifiedCount}= await User.updateOne({_id},{
            $addToSet:{coursesAsTeacher:courseId}
        })
        if(!modifiedCount){
            throw new AppError("You are already a member of this class",HttpStatus.CONFLICT)
        }
    }

    const isUserTeacher = async(_id:string,courseId:string)=>{
        const res = await User.findOne({_id,coursesAsTeacher:courseId})
        if(res){
            return true
        }else{
            return false
        }
    }

    const addCourseAsStudent = async(_id:string,courseId:string)=>{
        const {modifiedCount}= await User.updateOne({_id},{
            $addToSet:{coursesAsStudent:courseId}
        })
        if(!modifiedCount){
            throw new AppError("You are already a member of this class",HttpStatus.CONFLICT)
        }
    }

    return {
        getUserByEmail,
        addUser,
        getUserById,
        addCourseAsTeacher,
        isUserTeacher,
        addCourseAsStudent
    }
}

export type UserRepositoryMongoDB = typeof userRepositoryMongoDB