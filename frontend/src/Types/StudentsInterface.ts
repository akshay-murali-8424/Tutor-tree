import { UserInterface } from "./UserInterface";

export interface StudentsInterface{
    _id:string,
    course:string,
    students:{
      userId:UserInterface | null
    }[]
 }