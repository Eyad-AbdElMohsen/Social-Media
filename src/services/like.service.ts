import { ObjectId, Types } from "mongoose"
import mongoose from "mongoose"
import { IPost, Post } from "../models/post.model"


export const getPostLikes = (post: IPost) =>{
    let users: Array<ObjectId> = post.likes
    return users
}

export const getNumberOfLikes = (post: IPost) =>{
    let numberOfLikes: number = post.likes.length
    return numberOfLikes
}

export const isLiked = (post: IPost, userId: ObjectId) =>{
    console.log(post.likes)
    const isLiked = post.likes.find((user: ObjectId) => user == userId);
    console.log(isLiked)
    if(isLiked)return true
    return false
}

export const likePost = async(userId: ObjectId, post: IPost) => {
    post.likes.push(userId)
    await post.save()
    return true
}

export const removeLike = async(userId: ObjectId, post: IPost) => {
    let index = post.likes.indexOf(userId);
    post.likes.splice(index, 1);
    await post.save()
    return true
}
