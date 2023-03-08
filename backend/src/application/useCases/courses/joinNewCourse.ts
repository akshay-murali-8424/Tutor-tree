import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { CourseDbInterface } from "../../repositories/courseDbRepository";
import { StudentsDbInterface } from "../../repositories/studentsDbRepository";
import { UserDbInterface } from "../../repositories/userDbRepository";

export const joinNewCourse = async(
  userId: string,
  refCode: string,
  dbRepositoryStudents: ReturnType<StudentsDbInterface>,
  dbRepositoryUser:ReturnType<UserDbInterface>,
  dbRepositoryCourse:ReturnType<CourseDbInterface>
) => {
    const res = await dbRepositoryCourse.getCourseByRefCode(refCode)
    if(!res){
      throw new AppError("Invalid referral code",HttpStatus.NOT_ACCEPTABLE)
    }
    const courseId=res._id.toString()
    const isUserTeacher = await dbRepositoryUser.isUserTeacher(userId,courseId)
    if(isUserTeacher){
      throw new AppError("You are already a teacher in this class",HttpStatus.CONFLICT)
    }
    await dbRepositoryUser.addCourseAsStudent(userId,courseId)
    await dbRepositoryStudents.addStudent(courseId,userId)
};
