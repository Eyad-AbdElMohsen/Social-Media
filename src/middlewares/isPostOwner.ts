import {  Response, NextFunction } from 'express';
import * as postServices from '../services/post.service'
import { CustomRequest } from './verifyToken';
import ApiError from '../errors/api.error';
import asyncWrapper from './asyncWrapper.middleware';


export const isPostOwner = asyncWrapper(async(req: CustomRequest, res: Response, next: NextFunction) => {
    const post = await postServices.getPost(req.params.postId)
    if(!post){
        throw new ApiError('this id has no available posts', 404)
    }
    if(post.userId != req.currentUser!.id){
        throw new ApiError('You dont have permission, You are not the post\'s owner', 401)
    }
    next()
})