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
    let user = await userServices.getUser(req.body.email)
    if(!user){
        throw new ApiError('This email is not in database', 409, req.path, {data: null})
    }
    const correctPass: boolean = await userServices.correctPassword(req.body.password, user)
    if(!correctPass){
        throw new ApiError("Password isn't correct" ,  400, req.path)
    }
    const token = await userServices.login(user)
    res.status(200).json({
        status: SUCCESS,
        data: {
            email: user.email,
            Name: user.name,
            role: user.role,
            token: token
        }
    })
})


export const getAllUsers = asyncWrapper(async(req: Request, res: Response) => {
    const limit: number = Number(req.query.limit);
    const skip: number = Number(req.query.skip);
    const users = await userServices.getAllUsers(limit, skip)
        res.status(200).json({
        status: SUCCESS,
        data: {users}
    })
})

