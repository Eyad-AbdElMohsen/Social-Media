import { Request, Response } from "express";
import ApiError from "../errors/api.error";
import asyncWrapper from "../middlewares/asyncWrapper.middleware";
import { SUCCESS } from "../utils/httpStatusText";
import { CustomRequest } from "../utils/customRequest";
import { Types } from "mongoose";
import * as userServices from '../services/user.service'
import * as postServices from '../services/post.service'
import * as friendServices from '../services/friends.service'


export const postSignUp = asyncWrapper( async(req: Request, res: Response) => {
    const user = await userServices.getUserByEmail(req.body.email)
    if(user) throw new ApiError('This email is already exists', 409, 'postSignUp middleware in user controller file', user)
    const newUser = await userServices.postSignup(req.body)
    res.status(200).json({
        status: SUCCESS,
        data: {
            newUser: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
        },
    });
    
})

export const postLogin = asyncWrapper( async(req: CustomRequest, res: Response) => {
    const user = req.user!
    const correctPass: boolean = await userServices.correctPassword(req.body.password, user)
    if(!correctPass) throw new ApiError("Password isn't correct" ,  400, 'postLogin middleware in user controller file')
    const token = await userServices.login(user)
    res.status(200).json({
        status: SUCCESS,
        data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: token
        }
    })
})


export const getAllUsers = asyncWrapper(async(req: Request, res: Response) => {
    const limit = Number(req.query.limit);
    const skip = Number(req.query.skip);
    const users = await userServices.getAllUsers(limit, skip)
    res.status(200).json({
        status: SUCCESS,
        data: users.map(user => ({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        })),
    });
})


export const getUserPosts = asyncWrapper (async(req: CustomRequest, res: Response) => {
    const limit = Number(req.query.limit);
    const skip = Number(req.query.skip);
    const posts = await postServices.getUserPosts(limit, skip, new Types.ObjectId(req.params.userId))
    res.status(200).json({
        status: SUCCESS,
        data: posts.map((post, index) => ({
            postNumber: index + 1,
            post: post
        })),
    })
})

export const getMyPosts = asyncWrapper (async(req: CustomRequest, res:Response) => {
    const limit = Number(req.query.limit);
    const skip = Number(req.query.skip);
    const posts = await postServices.getUserPosts(limit, skip, req.currentUser!.id)
    res.status(200).json({
        status: SUCCESS,
        data: posts.map((post, index) => ({
            postNumber: index + 1,
            post: post
        })),
    })
})


export const getMyFriends = asyncWrapper(async(req: CustomRequest, res: Response) => {
    const limit = Number(req.query.limit);
    const skip = Number(req.query.skip);
    const friends = await friendServices.getUserFriends(limit, skip, req.me!)
    res.status(200).json({
        status: SUCCESS,
        data: friends.map((friend, index) => ({
            friendNumber: index + 1,
            friend: friend
        })),
    })
})

export const getUserFriends = asyncWrapper(async(req: CustomRequest, res: Response) => {
    const limit = Number(req.query.limit);
    const skip = Number(req.query.skip);
    const friends = await friendServices.getUserFriends(limit, skip, req.user!)
    res.status(200).json({
        status: SUCCESS,
        data: friends.map((friend, index) => ({
            friendNumber: index + 1,
            friend: friend
        })),
    })
})