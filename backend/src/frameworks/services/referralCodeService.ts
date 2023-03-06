import {nanoid} from 'nanoid'

export const referralCodeService=()=>{
   const generateCode=()=> nanoid(8)

   return {
    generateCode
   }
}

export type ReferralCodeService = typeof referralCodeService