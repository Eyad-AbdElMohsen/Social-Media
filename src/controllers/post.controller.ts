import { Request, Response } from "express";
import asyncWrapper from "../middlewares/asyncWrapper.middleware";
import * as postServices from '../services/post.service'
import * as likeServices from '../services/like.service'
import * as commentService from '../services/comment.service'
import * as replyService from '../services/reply.service'
import * as shareService from '../services/share.service'
import { SUCCESS } from "../utils/httpStatusText";
import { CustomRequest } from "../utils/customRequest";
import ApiError from "../errors/api.error";
import { Types, ObjectId } from "mongoose";


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
        data: posts.map((post, index) => ({
            postNumber: index + 1,
            post: {
                _id: post._id,
                userId: post.userId,
                content: post.content,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt
            }
        })),
    })
})

export const getPost = asyncWrapper(async(req: CustomRequest, res: Response) => {
    const post = req.post
    res.status(200).json({
        status: SUCCESS,
        data: {post}
    })
})

export const editPost = asyncWrapper(async(req: CustomRequest, res: Response) => {
    const post = req.post
    await postServices.editPost(req.post!, {
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
    await postServices.deletePost(req.params.postId)
    res.status(200).json({
        status: SUCCESS,
        data: null
    })
})

export const getPostLikes = asyncWrapper(async(req: CustomRequest, res: Response) => {
    let users = likeServices.getPostLikes(req.post!)
    let numberOfLikes = likeServices.getNumberOfLikes(req.post!)
    res.status(200).json({
        status: SUCCESS,
        data: {
            numberOfLikes,
            users
        }
    })
})

export const likePost = asyncWrapper(async(req: CustomRequest, res: Response) => {
    let userId = req.currentUser!.id
    let isLiked = likeServices.isLiked(req.post!, userId)
    if(isLiked)throw new ApiError('This user liked the post before', 409, 'likePost middleware in post controller file', {id: req.params.postId})
    let tryLike = await likeServices.likePost(userId, req.post!)
    if(!tryLike) throw new Error('Failed')
    res.status(200).json({status: SUCCESS})
})

export const removeLike = asyncWrapper(async(req: CustomRequest, res: Response) => {
    let userId = req.currentUser!.id
    let isLiked = likeServices.isLiked(req.post!, userId)
    if(!isLiked)throw new ApiError('This user is already not like the post before', 409, 'removeLike middleware in post controller file', {id: req.params.postId})
    await likeServices.removeLike(userId, req.post!)
    res.status(200).json({status: SUCCESS})
})

export const getPostComments = asyncWrapper(async(req: CustomRequest, res: Response) => {
    let comments = await commentService.getPostComments(req.post!)
    res.status(200).json({
        status: SUCCESS,
        data: comments.map((comment, index) => ({
            commentNumber: index + 1,
            comment
        })),
    })
})

export const getPostComment = asyncWrapper(async(req: CustomRequest, res: Response) => { 
    const comment = req.comment
    res.status(200).json({
        status: SUCCESS,
        data: comment
    })
})

export const addPostComment = asyncWrapper(async(req: CustomRequest, res: Response) => {
    const postId = new Types.ObjectId(req.params.postId)
    let newComment = await commentService.addPostComment(req.post!, {
        userId: req.currentUser!.id, 
        postId: postId,
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
    let commentId = new Types.ObjectId(req.params.commentId);
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
    let commentId = new Types.ObjectId(req.params.commentId);
    await commentService.deletePostComment(commentId)
    res.status(200).json({satus: SUCCESS, data: null})
})

export const getCommentReplies = asyncWrapper(async(req: CustomRequest, res: Response) => {
    let replies = await replyService.getCommentReplies(req.comment!)
    res.status(200).json({
        status: SUCCESS,
        data: replies.map((reply, index) => ({
            replyNumber: index + 1,
            reply, 
        })),
    })
})


export const addCommentReply = asyncWrapper(async(req: CustomRequest, res: Response) => {
    const postId = new Types.ObjectId(req.params.postId)
    let newReply = await replyService.addCommentReply(req.comment!, {
        userId: req.currentUser!.id, 
        postId: postId,
        content: {
            text: req.body.text, 
            fileName: req.file?.filename
        }
    })
    res.status(200).json({
        status: SUCCESS,
        data: {newReply}
    })
})

export const getPostShares = asyncWrapper(async(req: CustomRequest, res: Response) => {
    const shares = await shareService.getPostShares(req.post!)
    res.status(200).json({
        status: SUCCESS,
        data: {shares}
    })
})

export const addPostShare = asyncWrapper(async(req: CustomRequest, res: Response) => {
    if(req.me!._id.toString() === req.post!.userId.toString())throw new ApiError('You can not share your post', 400)
    const newShare = await shareService.addPostShare(req.post!, {
        userId: req.currentUser!.id, 
        text: req.body.text, 
        fileName: req.file?.filename,
        originalPost: req.post!._id as ObjectId
    })
    res.status(200).json({
        status: SUCCESS,
        data: {newShare}
    })
})
