import { CloudServiceInterface } from "../../services/cloudServiceInterface";

export const getAttachmentUrl =async(key:string,cloudService:ReturnType<CloudServiceInterface>)=>
await cloudService.getFile(key)