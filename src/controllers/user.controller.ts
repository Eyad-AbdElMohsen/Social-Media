import { Request, Response, NextFunction } from "express";
import ApiError from "../errors/api.error";
import asyncWrapper from "../middlewares/asyncWrapper.middleware";
import * as userServices from '../services/user.service'
import { SUCCESS } from "../utils/httpStatusText";



export const postSignUp = asyncWrapper( async(req: Request, res: Response) => {
    const user = await userServices.getUser(req.body.email)
    if(user){
        throw new ApiError('This email is already exists', 409, req.path, user)
    }
    const newUser = await userServices.postSignup(req.body)
    res.status(200).json({
        status: SUCCESS,
        data: {newUser}
    })
})

export const postLogin = asyncWrapper( async(req: Request, res: Response) => {
    const user = await userServices.getUser(req.body.email)
    if(!user){
        throw new ApiError('This email is already exists', 409, req.path, {data: null})
    }
    const correctPass: boolean = await userServices.correctPassword(req.body.password, user)
    if(!correctPass){
        throw new ApiError("Password isn't correct" ,  400, req.path)
    }
    res.status(200).json({
        status: SUCCESS,
        data: {user}
    })
})


