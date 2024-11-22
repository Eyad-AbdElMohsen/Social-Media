import { Request, Response } from "express";
import asyncWrapper from "../middlewares/asyncWrapper.middleware";
import * as postServices from '../services/post.service'
import * as likeServices from '../services/like.service'
import * as commentService from '../services/comment.service'
import { SUCCESS } from "../utils/httpStatusText";
import { CustomRequest } from "../middlewares/verifyToken";
import ApiError from "../errors/api.error";
import { Types } from "mongoose";

export const addPost = asyncWrapper( async(req: CustomRequest, res: Response) => {
    const newPost = await postServices.addPost({
        userId: req.currentUser!.id, 
        text: req.body.text, 
        fileName: req.file?.filename
    })
    res.status(200).json({
        status: SUCCESS,
        data: {newPost}
    })
})

export const getAllPosts = asyncWrapper(async(req: Request, res: Response) => {
    const limit: number = Number(req.query.limit);
    const skip: number = Number(req.query.skip);
    const posts = await postServices.getAllPosts(limit, skip)
    res.status(200).json({
        status: SUCCESS,
        data: {posts}
    })
})

export const getPost = asyncWrapper(async(req: CustomRequest, res: Response) => {
    const post = await postServices.getPost(req.params.postId)
    if(!post) throw new ApiError('This id has no available post', 404, req.path, {id: req.params.postId})
    res.status(200).json({
        status: SUCCESS,
        data: {post}
    })
})

export const editPost = asyncWrapper(async(req: CustomRequest, res: Response) => {
    let post = await postServices.getPost(req.params.postId)
    if(!post) throw new ApiError('This id has no available post', 404, req.path, {id: req.params.postId})
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

export const deletePost = asyncWrapper(async(req: CustomRequest, res: Response) => {
    let post = await postServices.getPost(req.params.postId)
    if(!post) throw new ApiError('This id has no available post', 404, req.path, {id: req.params.postId})
    await postServices.deletePost(req.params.postId)
    res.status(200).json({
        status: SUCCESS,
        data: null
    })
})

export const getPostLikes = asyncWrapper(async(req: Request, res: Response) => {
    let post = await postServices.getPost(req.params.postId)
    if(!post) throw new ApiError('This id has no available post', 404, req.path, {id: req.params.postId})
    let users = likeServices.getPostLikes(post)
    let numberOfLikes = likeServices.getNumberOfLikes(post)
    res.status(200).json({
        status: SUCCESS,
        data: {
            numberOfLikes,
            users
        }
    })
})

export const likePost = asyncWrapper(async(req: CustomRequest, res: Response) => {
    let post = await postServices.getPost(req.params.postId)
    if(!post) throw new ApiError('This id has no available post', 404, req.path, {id: req.params.postId})
    let userId = req.currentUser!.id
    let isLiked = likeServices.isLiked(post, userId)
    if(isLiked)throw new ApiError('This user liked the post before', 409, req.path, {id: req.params.postId})
    let tryLike = await likeServices.likePost(userId, post)
    if(!tryLike) throw new Error('Failed')
    res.status(200).json({status: SUCCESS})
})

export const removeLike = asyncWrapper(async(req: CustomRequest, res: Response) => {
    let post = await postServices.getPost(req.params.postId)
    if(!post) throw new ApiError('This id has no available post', 404, req.path, {id: req.params.postId})
    let userId = req.currentUser!.id
    let isLiked = likeServices.isLiked(post, userId)
    if(!isLiked)throw new ApiError('This user is already not like the post before', 409, req.path, {id: req.params.postId})
    await likeServices.removeLike(userId, post)
    res.status(200).json({status: SUCCESS})
})

export const getPostComments = asyncWrapper(async(req: Request, res: Response) => {
    let post = await postServices.getPost(req.params.postId)
    if(!post) throw new ApiError('This id has no available post', 404, req.path, {id: req.params.postId})
    let comments = await commentService.getPostComments(post)
    res.status(200).json({
        status: SUCCESS,
        data: {comments}
    })
})

export const getPostComment = asyncWrapper(async(req: Request, res: Response) => { 
    let post = await postServices.getPost(req.params.postId)
    if(!post) throw new ApiError('This id has no available post', 404, req.path, {id: req.params.postId})
    let commentId = new Types.ObjectId(req.params.commentId);
    let comment = await commentService.getCommentById(commentId)
    if(!comment) throw new ApiError('This id has no available comment', 404, req.path, {id: req.params.commentId})
    res.status(200).json({
        status: SUCCESS,
        data: comment
    })
})

export const addPostComment = asyncWrapper(async(req: CustomRequest, res: Response) => {
    let post = await postServices.getPost(req.params.postId)
    if(!post) throw new ApiError('This id has no available post', 404, req.path, {id: req.params.postId})
    let newComment = await commentService.addPostComment(post, {
        userId: req.currentUser!.id, 
        content: {
            text: req.body.text, 
            fileName: req.file?.filename
        }
    })
    res.status(200).json({
        status: SUCCESS,
        data: {newComment}
    })
})

export const editPostComment = asyncWrapper(async(req: CustomRequest, res: Response) => {
    let post = await postServices.getPost(req.params.postId)
    if(!post) throw new ApiError('This id has no available post', 404, req.path, {id: req.params.postId})
    let commentId = new Types.ObjectId(req.params.commentId);
    let comment = await commentService.getCommentById(commentId)
    if(!comment) throw new ApiError('This id has no available comment', 404, req.path, {id: req.params.commentId})
    const commentAfterEdit = await commentService.editPostComment({
        userId: req.currentUser!.id, 
        content: {
            text: req.body.text, 
            fileName: req.file?.filename
        },
        _id: commentId
    })
    res.status(200).json({satus: SUCCESS, data:{commentAfterEdit}})
})

export const deletePostComment = asyncWrapper(async(req: CustomRequest, res: Response) => {
    let post = await postServices.getPost(req.params.postId)
    if(!post) throw new ApiError('This id has no available post', 404, req.path, {id: req.params.postId})
    let commentId = new Types.ObjectId(req.params.commentId);
    let comment = await commentService.getCommentById(commentId)
    if(!comment) throw new ApiError('This id has no available comment', 404, req.path, {id: req.params.commentId})
    await commentService.deletePostComment(commentId)
    res.status(200).json({satus: SUCCESS, data: null})
})
