import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const authService=()=>{
    const encryptPassword=async(password:string)=>{
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        return password
    }

    const comparePassword=(password:string,hashedPassword:string)=>{
       return bcrypt.compare(password,hashedPassword)
    }

    const generateToken=(payload:string)=>{
        const token = jwt.sign({payload}, process.env.JWT_SECRET as string, {
            expiresIn: "2d",
        });
        return token
    }

    const verifyToken=(token:string)=>{
        return jwt.verify(token, process.env.JWT_SECRET as string)
    }

    return {
        encryptPassword,
        comparePassword,
        generateToken,
        verifyToken
    }
}


export type AuthService = typeof authService 

export type AuthServiceReturn = ReturnType<AuthService>