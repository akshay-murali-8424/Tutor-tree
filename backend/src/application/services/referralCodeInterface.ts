import { ReferralCodeService } from "../../frameworks/services/referralCodeService";

export const referralCodeInterface=(service:ReturnType<ReferralCodeService>)=>{
  const generateCode=()=>service.generateCode()

  return {
    generateCode
  }
}

export type ReferralCodeInterface = typeof referralCodeInterface
