import { UserInterface } from "./UserInterface";

export interface TeachersInterface{
   _id:string,
   course:string,
   teachers:{
      userId:UserInterface | null
    }[]
}

