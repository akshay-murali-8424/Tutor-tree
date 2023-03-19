import { CloudServiceImpl } from "../../frameworks/services/s3Service";

export const cloudServiceInterface = (service:ReturnType<CloudServiceImpl>) =>{
   
    const upload = (file:any) => service.uploadFile(file)

    const getFile = (fileKey:string) => service.getFileStream(fileKey)

    return {
        upload,
        getFile
    }
}

export type CloudServiceInterface = typeof cloudServiceInterface