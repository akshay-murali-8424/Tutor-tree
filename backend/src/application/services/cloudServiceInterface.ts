import { CloudServiceImpl } from "../../frameworks/services/s3Service";

export const cloudServiceInterface = (service:ReturnType<CloudServiceImpl>) =>{
   
    const upload = async(file:Express.Multer.File) => await service.uploadFile(file)

    const getFile = async(fileKey:string) =>await service.getFile(fileKey)

    return {
        upload,
        getFile
    }
}

export type CloudServiceInterface = typeof cloudServiceInterface