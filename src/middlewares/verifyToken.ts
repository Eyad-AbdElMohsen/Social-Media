import { Response, NextFunction } from "express";
import asyncWrapper from "./asyncWrapper.middleware";
import ApiError from "../errors/api.error";
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { secretKey } from "../utils/generateJWT";
import { JwtPayload} from '../models/user.model'
import { CustomRequest } from "../utils/customRequest";

dotenv.config()

// this middleware extracts a token from the ( Authorization header ), verifies it, and attaches the user to ( req.currentUser )
export const verifyToken = asyncWrapper(async(req: CustomRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    if(!authHeader) throw new ApiError('token is required', 401, 'verifyToken.file')
    const token = authHeader.split(' ')[1]
    if(!secretKey) throw new ApiError('internal server error', 500)
    const user = jwt.verify(token, secretKey) as JwtPayload
    req.currentUser = user
    next()
})