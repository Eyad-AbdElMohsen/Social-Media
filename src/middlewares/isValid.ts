import { Request, Response, NextFunction } from "express";
import asyncWrapper from "./asyncWrapper.middleware";
import ApiError from "../errors/api.error";
import { CustomRequest } from "../utils/customRequest";
import { Types } from "mongoose";
import { getCommentById } from "../services/comment.service";
import { getPost } from "../services/post.service";
import { getUserByEmail, getUserById } from "../services/user.service";


export const isValidPost = asyncWrapper(async(req: CustomRequest, res: Response, next: NextFunction) => {
    const post = await getPost(new Types.ObjectId(req.params.postId))
    if(!post) throw new ApiError('This id has no available post', 404, req.path, {id: req.params.postId})
    req.post = post
    next()
})

export const isValidComment = asyncWrapper(async(req: CustomRequest, res: Response, next: NextFunction) => {
    const comment = await getCommentById(new Types.ObjectId(req.params.commentId))
    if(!comment) throw new ApiError('This id has no available comment', 404, req.path, {id: req.params.commentId})
    req.comment = comment
    next()
})

export const isValidEmail = asyncWrapper(async(req: CustomRequest, res: Response, next: NextFunction) => {
    let user = await getUserByEmail(req.body.email)
    if(!user) throw new ApiError('This email is not in database', 409, req.path, {data: null})
    req.user = user
    next()
})

export const isValidUser = asyncWrapper(async(req: CustomRequest, res: Response, next: NextFunction) => {
    let user = await getUserById(new Types.ObjectId(req.params.userId))
    if(!user) throw new ApiError('This email is not in database', 409, req.path, {data: null})
    req.user = user
    next()
})
