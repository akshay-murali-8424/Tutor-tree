import S3 from 'aws-sdk/clients/s3';
import fs from 'fs'
import configKeys from '../../config';

const s3 = new S3({
   region:configKeys.AWS_BUCKET_REGION,
   accessKeyId:configKeys.AWS_ACCESS_KEY,
   secretAccessKey:configKeys.AWS_SECRET_ACCESS_KEY
})


export const s3Service= ()=>{
    const uploadFile = (file:any) => {
        const fileStream = fs.createReadStream(file.path);
        const uploadParams = {
          Bucket: configKeys.AWS_BUCKET_NAME,
          Body: fileStream,
          Key: file.filename,
        };
        return s3.upload(uploadParams).promise();
    }

    const getFileStream = (fileKey:string) => {
        const downloadParams = {
          Key: fileKey,
          Bucket: configKeys.AWS_BUCKET_NAME,
        };
        return s3.getObject(downloadParams).createReadStream();
    };
    
    return {
        uploadFile,
        getFileStream
    }
}

export type CloudServiceImpl = typeof s3Service