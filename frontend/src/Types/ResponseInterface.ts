import { CourseInterface } from "./CourseInterface";
import { StudentsInterface } from "./StudentsInterface";
import { TeachersInterface } from "./TeachersInterface";
import { UserInterface } from "./UserInterface";

export interface IBasicResponse{
    readonly status:string,
    readonly message:string,
}

export interface ILoginResponse{
   readonly status:string,
   readonly message:string,
   readonly token:string
}

export interface IGetUserAndCoursesResponse extends Omit<UserInterface,'coursesAsTeacher'|'coursesAsStudent'>{
    coursesAsTeacher:CourseInterface[],
    coursesAsStudent:CourseInterface[]
}

export interface IGetPeople{
    teachers:TeachersInterface,
    students:StudentsInterface
}

