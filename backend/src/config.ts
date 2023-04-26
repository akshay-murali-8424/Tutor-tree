import dotenv from 'dotenv'
dotenv.config();

const configKeys= {
    AWS_BUCKET_NAME:process.env.AWS_BUCKET_NAME as string,

    AWS_BUCKET_REGION: process.env.AWS_BUCKET_REGION as string,

    AWS_ACCESS_KEY:process.env.AWS_ACCESS_KEY as string,

    AWS_SECRET_ACCESS_KEY:process.env.AWS_SECRET_ACCESS_KEY as string,

    MONGO_DB_URL: process.env.DATABASE as string,

    PORT: process.env.PORT,

    JWT_SECRET: process.env.JWT_SECRET as string,

    NODE_ENV: process.env.NODE_ENV as string,

    GOOGLE_AUTH_CLIENT: process.env.GOOGLE_AUTH_CLIENT as string,

    CLOUD_NAME:process.env.CLOUD_NAME as string,
     
    CLOUD_KEY:process.env.CLOUD_KEY as string,

    CLOUD_KEY_SECRET: process.env.CLOUD_KEY_SECRET as string,

    ORIGIN_PORT: process.env.ORIGIN_PORT as string
}


export default configKeys