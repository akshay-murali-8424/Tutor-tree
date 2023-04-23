import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import configKeys from '../../config';
import  crypto from 'crypto'

const s3 = new S3Client({
  credentials:{
    accessKeyId:configKeys.AWS_ACCESS_KEY,
    secretAccessKey:configKeys.AWS_SECRET_ACCESS_KEY
   },
   region:configKeys.AWS_BUCKET_REGION,
}) 

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')


export const s3Service= ()=>{
    const uploadFile = async(file:Express.Multer.File) => {
        const key = randomImageName() 
       const params = {
        Bucket:configKeys.AWS_BUCKET_NAME,
        Key:key,
        Body:file.buffer,
        ContentType:file.mimetype
       }
       const command = new PutObjectCommand(params)
       await s3.send(command)
       return {
        name:file.originalname,
        key
       }
    }

    const getFile = async(fileKey:string) => {
        const getObjectParams = {
            Bucket:configKeys.AWS_BUCKET_NAME,
            Key:fileKey
        }
        const command = new GetObjectCommand(getObjectParams)
        return await getSignedUrl(s3,command,{expiresIn:60000}) 
    };
    
    return {
        uploadFile,
        getFile
    }
}

export type CloudServiceImpl = typeof s3Service