import { NextFunction, Request, Response } from "express";
import asyncWrapper from "../middlewares/asyncWrapper.middleware";
import * as postServices from '../services/post.service'
import { SUCCESS } from "../utils/httpStatusText";
import { CustomRequest } from "../middlewares/verifyToken";
import ApiError from "../errors/api.error";
import { Types } from "mongoose";

const ObjectId = Types.ObjectId

export const addPost = asyncWrapper( async(req: CustomRequest, res: Response, next: NextFunction) => {
    if(req.currentUser){
        const newPost = await postServices.addPost({
            userId: req.currentUser.id, 
            text: req.body.text, 
            fileName: req.file?.filename
        })
        res.status(200).json({
            status: SUCCESS,
            data: {newPost}
        })
    }else{
        throw new Error('error')
    }
})

export const getAllPosts = asyncWrapper(async(req: Request, res: Response, next: NextFunction) => {
    const limit: number = Number(req.query.limit);
    const skip: number = Number(req.query.skip);
    const posts = await postServices.getAllPosts(limit, skip)
    res.status(200).json({
        status: SUCCESS,
        data: {posts}
    })
})

export const getPost = asyncWrapper(async(req: CustomRequest, res: Response, next: NextFunction) => {
    const post = await postServices.getPost(req.params.postId)
    if(!post){
        throw new ApiError('This id has no available post', 404, req.path, {id: req.params.postId})
    }
    res.status(200).json({
        status: SUCCESS,
        data: {post}
    })
})

export const editPost = asyncWrapper(async(req: CustomRequest, res: Response, next: NextFunction) => {
    let post = await postServices.getPost(req.params.postId)
    if(!post){
        throw new ApiError('This id has no available post', 404, req.path, {id: req.params.postId})
    }
    await postServices.editPost(post, {
        content: {
            text: req.body.text,
            image: req.file?.filename
        }
    })
    res.status(200).json({
        status: SUCCESS,
        data: {post}
    })
})

export const deletePost = asyncWrapper(async(req: CustomRequest, res: Response, next: NextFunction) => {
    let post = await postServices.getPost(req.params.postId)
    if(!post){
        throw new ApiError('This id has no available post', 404, req.path, {id: req.params.postId})
    }
    await postServices.deletePost(req.params.postId)
    res.status(200).json({
        status: SUCCESS,
        data: null
    })
})