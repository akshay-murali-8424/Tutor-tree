import { UserInterface } from "./UserInterface";

export interface StudentsInterface{
    _id:string,
    course:string,
    students:UserInterface[] | null
 }