export interface ClassWorkInterface {
    title:string,
    description?:string,
    course?:string,
    totalMark?:number | string,
    dueDate?:string,
    attachments?: {name:string,key:string} [],
    assignedBy?:string,
    assigned:Number
}