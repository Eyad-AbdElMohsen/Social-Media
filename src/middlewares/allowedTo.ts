import { Request, Response, NextFunction } from 'express';
import { Role } from "../utils/userRole";
import {CustomRequest} from "../middlewares/verifyToken";
import ApiError from '../errors/api.error';

export const allowedTo = (roles: Role[]) => {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        if(req.currentUser){
            console.log(req.currentUser.role)
            if(roles.includes(req.currentUser.role)){
                next()
            }else{
                throw new ApiError('You are not allowed to this action', 401)
            }
        }else{
            throw new Error('you should login')
        }
}}