import { ObjectId } from "mongoose"
import { IPost } from "../models/post.model"


export const getPostLikes = (post: IPost) =>{
    let users: Array<ObjectId> = post.likesUserId
    return users
}

export const getNumberOfLikes = (post: IPost) =>{
    let numberOfLikes = post.likesUserId.length
    return numberOfLikes
}

export const isLiked = (post: IPost, userId: ObjectId) =>{
    const isLiked = post.likesUserId.find((user: ObjectId) => user == userId);
    if(isLiked)return true
    return false
}

export const likePost = async(userId: ObjectId, post: IPost) => {
    post.likesUserId.push(userId)
    await post.save()
    return true
}

export const removeLike = async(userId: ObjectId, post: IPost) => {
    let index = post.likesUserId.indexOf(userId);
    post.likesUserId.splice(index, 1);
    await post.save()
    return true
}
