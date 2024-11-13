import {    Request, Response, NextFunction } from "express";
import asyncWrapper from "./asyncWrapper.middleware";
import ApiError from "../errors/api.error";
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { secretKey } from "../utils/generateJWT";
import { JwtPayload} from '../models/user.model'

dotenv.config()

export interface CustomRequest extends Request {
    currentUser?: JwtPayload
}

export const verifyToken = asyncWrapper(async(req: CustomRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    if(!authHeader){
        throw new ApiError('token is required', 401, req.path)
    }
    const token = authHeader.split(' ')[1]
    if(!secretKey){
        throw new ApiError('internal server error', 500)
    }
    const user = jwt.verify(token, secretKey) as JwtPayload
    req.currentUser = user
    next()
})