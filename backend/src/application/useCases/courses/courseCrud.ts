import { CourseDbInterface } from "../../repositories/courseDbRepository";
import { TeachersDbRepository } from "../../repositories/teachersDbRepository";
import { ReferralCodeInterface } from "../../services/referralCodeInterface";

export const addCourse = async(
  name: string,
  section: string,
  subject: string,
  createdBy: string,
  dbRepositoryCourse: ReturnType<CourseDbInterface>,
  dbRepositoryTeachers:ReturnType<TeachersDbRepository>,
  referralService:ReturnType<ReferralCodeInterface>
) => {
  const referralCode=referralService.generateCode()
  const id=await dbRepositoryCourse.addNewCourse(name, section, subject, createdBy,referralCode);
  const courseId=id.toString()
  await dbRepositoryTeachers.addTeacher(courseId,createdBy)
};

export const getCourseById=async(id:string,dbRepositoryCourse: ReturnType<CourseDbInterface>)=>{
    return await dbRepositoryCourse.getCourse(id)
}

export const editCourse=async(id:string,name:string,section:string,subject:string,dbRepositoryCourse:ReturnType<CourseDbInterface>)=>{
  await dbRepositoryCourse.editCourse(id,name,section,subject)
}
