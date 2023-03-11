import { CourseInterface } from "./CourseInterface";
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
