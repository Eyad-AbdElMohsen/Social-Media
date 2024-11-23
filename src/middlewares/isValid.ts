import { Types } from "mongoose";
import { getPost } from "../services/post.service";
import asyncWrapper from "./asyncWrapper.middleware";
import { Request, Response, NextFunction } from "express";
import ApiError from "../errors/api.error";
import { getCommentById } from "../services/comment.service";
import { CustomRequest } from "../utils/customRequest";


export const isValidPost = asyncWrapper(async(req: CustomRequest, res: Response, next: NextFunction) => {
    const post = await getPost(new Types.ObjectId(req.params.postId))
    if(!post) throw new ApiError('This id has no available post', 404, req.path, {id: req.params.postId})
    req.post = post
    next()
})

export const isValidComment = asyncWrapper(async(req: CustomRequest, res: Response, next: NextFunction) => {
    let comment = await getCommentById(new Types.ObjectId(req.params.commentId))
    if(!comment) throw new ApiError('This id has no available comment', 404, req.path, {id: req.params.commentId})
    req.comment = comment
    next()
})