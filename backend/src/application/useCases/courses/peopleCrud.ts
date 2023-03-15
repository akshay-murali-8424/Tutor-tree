import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { StudentsDbInterface } from "../../repositories/studentsDbRepository";
import { TeachersDbInterface } from "../../repositories/teachersDbRepository";
import { UserDbInterface } from "../../repositories/userDbRepository";

export const getStudentsAndTeachers = async (
  courseId: string,
  dbRepositoryTeachers: ReturnType<TeachersDbInterface>,
  dbRepositoryStudents: ReturnType<StudentsDbInterface>
) => {
  const teachers = await dbRepositoryTeachers.getTeachers(courseId);
  const students = await dbRepositoryStudents.getStudents(courseId);

  return {
    teachers,
    students,
  };
};

export const addNewTeacher = async (
  courseId: string,
  userId: string,
  dbRepositoryUser: ReturnType<UserDbInterface>,
  dbRepositoryTeachers: ReturnType<TeachersDbInterface>
) => {
  const isUserStudent = await dbRepositoryUser.isUserStudent(userId,courseId)
  if(isUserStudent){
    throw new AppError("This user is already a student in this class",HttpStatus.CONFLICT)
  }
  const { modifiedCount } = await dbRepositoryUser.addCourseAsTeacher(
    userId,
    courseId
  );
  if (!modifiedCount) {
    throw new AppError(
      "This user is already a teacher in this class",
      HttpStatus.CONFLICT
    );
  }
  await dbRepositoryTeachers.addTeacher(courseId, userId);
};


export const addNewStudent = async (
  courseId: string,
  userId: string,
  dbRepositoryUser: ReturnType<UserDbInterface>,
  dbRepositoryStudents: ReturnType<StudentsDbInterface>
) => {
  const isUserTeacher = await dbRepositoryUser.isUserTeacher(userId,courseId)
  if(isUserTeacher){
    throw new AppError("This user is already a teacher in this class",HttpStatus.CONFLICT)
  }
  const { modifiedCount } = await dbRepositoryUser.addCourseAsStudent(
    userId,
    courseId
  );
  if (!modifiedCount) {
    throw new AppError(
      "This user is already a student in this class",
      HttpStatus.CONFLICT
    );
  }
  await dbRepositoryStudents.addStudent(courseId, userId);
};
