export interface ClassWorkInterface {
    title:string,
    description?:string,
    course?:string,
    totalMark?:number | string,
    dueDate?:string,
    attachments?: string [],
    assignedBy?:string
}