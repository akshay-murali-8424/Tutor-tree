export {}

  declare global {
    namespace Express {
      interface Request {
        userId?:string;
        course?:string
      }
    }
  }