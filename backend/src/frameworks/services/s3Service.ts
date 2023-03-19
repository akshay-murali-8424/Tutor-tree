import S3 from 'aws-sdk/clients/s3';
import fs from 'fs'
import configKeys from '../../config';

const s3 = new S3({
   region:configKeys.awsBucketRegion,
   accessKeyId:configKeys.awsAccessKey,
   secretAccessKey:configKeys.awsSecretAccessKey
})


export const s3Service= ()=>{
    const uploadFile = (file:any) => {
        const fileStream = fs.createReadStream(file.path);
        const uploadParams = {
          Bucket: configKeys.awsBucketName,
          Body: fileStream,
          Key: file.filename,
        };
        return s3.upload(uploadParams).promise();
    }

    const getFileStream = (fileKey:string) => {
        const downloadParams = {
          Key: fileKey,
          Bucket: configKeys.awsBucketName,
        };
        return s3.getObject(downloadParams).createReadStream();
    };
    
    return {
        uploadFile,
        getFileStream
    }
}

export type CloudServiceImpl = typeof s3Service