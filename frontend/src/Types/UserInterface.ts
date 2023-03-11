export interface UserInterface{
    _id:string,
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    __v:number,
    coursesAsTeacher:string[],
    coursesAsStudent:string[]
}
