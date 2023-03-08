export interface ILoginPayload{
    email:string,
    password:string
}

export interface IRegisterPayload extends ILoginPayload{
    firstName:string,
    lastName:string,
    confirmPassword:string
}

export interface ICreateCoursePayload{
    name:string,
    section:string,
    subject:string
}

export interface IJoinCoursePayload{
    refCode:string
}