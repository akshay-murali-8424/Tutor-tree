import userRouter from './user'
import adminRouter from './admin';
import { Application } from 'express';
import authRouter from './auth';
import { RedisClient } from '../../../app';
import userAuthMiddleware from '../middlewares/userAuthMiddleware';
import coursesRouter from './courses';
import classWorks from './classWorks';


const routes=(app:Application,redisClient:RedisClient)=>{
  app.use('/api/auth', authRouter());
  app.use('/api/user',userAuthMiddleware,userRouter(redisClient));
  app.use('/api/admin', adminRouter());
  app.use('/api/courses',coursesRouter(redisClient));
  app.use('/api/courses',classWorks());
 
}

export default routes

