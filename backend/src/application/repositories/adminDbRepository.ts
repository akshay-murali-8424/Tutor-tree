import {AdminRepositoryDbReturn} from '../../frameworks/database/mongoDb/repositories/adminRepositoryMongoDB'

export const adminDbRepository=(repository:AdminRepositoryDbReturn)=>{
  
  const getAdminByEmail=async(email:string)=>await repository.getAdminByEmail(email)

  return {
    getAdminByEmail
  }
}

export type AdminDbInterface = typeof adminDbRepository
