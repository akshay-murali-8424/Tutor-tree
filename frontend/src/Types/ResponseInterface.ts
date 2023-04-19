import { ClassWorkInterface } from "./classWorkInterface";
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

export interface IGetClassWorkResponse{
    title:string,
    course:string,
    description?:string,
    dueDate?:string | Date,
    postedOn:string,
    attachments:string[] | [],
    totalMark?: number,
    _id:string,
    assignedBy:UserInterface
}

export interface IGetSubmissionsResponse{
    _id:string,
    userId:UserInterface,
    classWork:ClassWorkInterface,
    attachments:string[],
    status: "assigned" | "submitted" | "returned"
}

export interface IGetMessagesResponse{
    _id:string,
    message:string,
    user:{
        _id:string,
        firstName:string,
        lastName:string,
        color:string
    }
    course:string,
    sentedTime:string
}



