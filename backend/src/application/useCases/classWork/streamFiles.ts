import { CloudServiceInterface } from "../../services/cloudServiceInterface";

export const streamFiles =(key:string,cloudService:ReturnType<CloudServiceInterface>)=>
cloudService.getFile(key)