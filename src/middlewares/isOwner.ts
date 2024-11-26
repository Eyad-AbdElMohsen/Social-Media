import {  Response, NextFunction } from 'express';
import * as postServices from '../services/post.service'
import * as commentService from '../services/comment.service'
import { CustomRequest } from '../utils/customRequest';
import ApiError from '../errors/api.error';
import asyncWrapper from './asyncWrapper.middleware';
import { Types } from 'mongoose';


export const isPostOwner = asyncWrapper(async(req: CustomRequest, res: Response, next: NextFunction) => {
    const post = await postServices.getPost(new Types.ObjectId(req.params.postId))
    if(!post) throw new ApiError('this id has no available posts', 404)
    if(post.userId != req.currentUser!.id)  throw new ApiError('You dont have permission, You are not the post\'s owner', 401)
    next()
})

export const isCommentOwner = asyncWrapper(async(req: CustomRequest, res: Response, next: NextFunction) => {
    const comment = await commentService.getCommentById(new Types.ObjectId(req.params.commentId))
    if(!comment)throw new ApiError('this id has no available comments', 404)
    if(comment.userId != req.currentUser!.id)throw new ApiError('You dont have permission, You are not the comment\'s owner', 401)
    next()
})


