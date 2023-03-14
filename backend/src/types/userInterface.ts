export interface UserInterface {
    _id: string;
    firstName:string;
    lastName:string;
    email: string;
    password: string;
    isGoogleUser:boolean
}
  
export interface CreateUserInterface{
    firstName:string;
    lastName:string;
    email: string;
    password?: string;
    isGoogleUser?:boolean
}