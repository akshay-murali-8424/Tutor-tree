import { RedisClient } from "../../app";
import { CourseDbInterface } from "../../application/repositories/courseDbRepository";
import { CourseRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/courseRepositoryMongoDB";
import asyncHandler from 'express-async-handler'
import { Request, Response } from "express";
import { CacheRepositoryInterface } from "../../application/repositories/cacheRepositoryInterface";
import { RedisRepository } from "../../frameworks/database/redis/setCache";
import { addCourse, editCourse, getCourseById } from "../../application/useCases/courses/courseCrud";
import { ReferralCodeService } from "../../frameworks/services/referralCodeService";
import { ReferralCodeInterface } from "../../application/services/referralCodeInterface";
import { TeachersRepositoryMongoDb } from "../../frameworks/database/mongoDb/repositories/teachersRepositoryMongoDB";
import { UserDbInterface } from "../../application/repositories/userDbRepository";
import { UserRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/userRepositoryMongoDB";
import { StudentsDbInterface } from "../../application/repositories/studentsDbRepository";
import { StudentsRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/studentsRepositoryMongoDB";
import { joinNewCourse } from "../../application/useCases/courses/joinNewCourse";
import { addNewStudent, addNewTeacher, getStudentsAndTeachers } from "../../application/useCases/courses/peopleCrud";
import { TeachersDbInterface } from "../../application/repositories/teachersDbRepository";


const courseController=(
courseDbRepository:CourseDbInterface,
courseDbRepositoryImpl:CourseRepositoryMongoDB,
cacheRepositoryInterface:CacheRepositoryInterface,
cacheRepositoryImpl:RedisRepository,
referralCodeInterface:ReferralCodeInterface,
referralCodeService:ReferralCodeService,
teachersDbRepository:TeachersDbInterface,
teachersRepositoryImpl:TeachersRepositoryMongoDb,
userDbRepository: UserDbInterface,
userDbRepositoryImpl: UserRepositoryMongoDB,
studentsDbRepository:StudentsDbInterface,
studentsRepositoryImpl:StudentsRepositoryMongoDB,
cacheClient:RedisClient
)=>{
    const dbRepositoryCourse=courseDbRepository(courseDbRepositoryImpl())
    const dbRepositoryTeachers=teachersDbRepository(teachersRepositoryImpl())
    const dbRepositoryUser=userDbRepository(userDbRepositoryImpl())
    const dbRepositoryStudents=studentsDbRepository(studentsRepositoryImpl())
    const referralService= referralCodeInterface(referralCodeService())
    const cacheRepository = cacheRepositoryInterface(cacheRepositoryImpl(cacheClient))
   
    const addNewCourse=asyncHandler(async(req:Request,res:Response)=>{
       const {name,section,subject}:{name:string,section:string,subject:string}= req.body
       const userId = req.userId
       if(userId){
        await addCourse(name,section,subject,userId,dbRepositoryCourse,dbRepositoryTeachers,dbRepositoryUser,referralService)
         res.json({
            status:"success",
            message:"course added"
         })
       }
    })

    const joinCourse=asyncHandler(async(req:Request,res:Response)=>{
       const refCode:string=req.params.refCode
       const userId = req.userId
       if(userId){
         await joinNewCourse(userId,refCode,dbRepositoryStudents,dbRepositoryUser,dbRepositoryCourse) 
         res.json({
            status:"success",
            message:"joined new course"
         })     
       }
    })

    const getCourse=asyncHandler(async(req:Request,res:Response)=>{
       const id = req.params.id
       const course = await getCourseById(id,dbRepositoryCourse)
       const cacheOptions={
        key:`course-${id}`,
        expireTimeSec:600,
        data: JSON.stringify(course)
       }
       await cacheRepository.setCache(cacheOptions)
       res.json(course)
    })

    const modifyCourse=asyncHandler(async(req:Request,res:Response)=>{
      const id=req.params.id
      const {name,section,subject}:{name:string,section:string,subject:string}=req.body
      await editCourse(id,name,section,subject,dbRepositoryCourse)
      res.json({
        status:"success",
        message:"course modified"
      })
    })

    const getPeople = asyncHandler(async(req:Request,res:Response)=>{
      const id = req.params.id
      const people = await getStudentsAndTeachers(id,dbRepositoryTeachers,dbRepositoryStudents)
      res.json(people)
    })

    const addTeacher=asyncHandler(async(req:Request,res:Response)=>{
      const {courseId} = req.params
      const {userId} = req.body
      await addNewTeacher(courseId,userId,dbRepositoryUser,dbRepositoryTeachers)
      res.json({
         status:"success",
         message:"new teacher added"
      })
    })

    const addStudent=asyncHandler(async(req:Request,res:Response)=>{
      const {courseId} = req.params
      const {userId} = req.body
      await addNewStudent(courseId,userId,dbRepositoryUser,dbRepositoryStudents)
      res.json({
         status:"success",
         message:"new student added"
      })
    })

    return {
        addNewCourse,
        getCourse,
        modifyCourse,
        joinCourse,
        getPeople,
        addTeacher,
        addStudent
    }
}

export default courseController