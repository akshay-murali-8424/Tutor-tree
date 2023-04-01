import dotenv from 'dotenv'
dotenv.config();

const configKeys= {
    awsBucketName:process.env.AWS_BUCKET_NAME as string,

    awsBucketRegion: process.env.AWS_BUCKET_REGION as string,

    awsAccessKey:process.env.AWS_ACCESS_KEY as string,

    awsSecretAccessKey:process.env.AWS_SECRET_ACCESS_KEY as string,

    mongoDbUrl: process.env.DATABASE as string,

    port: process.env.PORT || 5000,

    jwtSecret: process.env.JWT_SECRET as string,

    nodeEnv: process.env.NODE_ENV as string,

    googleAuthClient: process.env.GOOGLE_AUTH_CLIENT as string

}

export default configKeys