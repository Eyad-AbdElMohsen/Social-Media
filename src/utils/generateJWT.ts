import { JwtPayload} from '../models/user.model'
import jwt from 'jsonwebtoken'


export const secretKey = process.env.JWT_SECRET

export const generateJWT = async(payload: JwtPayload) => {
    if(secretKey){
        const token = jwt.sign(
            payload as JwtPayload,
            // in terminal -> require('crypto').randomBytes(32).toString('hex') 
            secretKey,
            {expiresIn: '5h'}
        )
        return token
    }else{
        throw new Error('the secretKey is required')
    }
}