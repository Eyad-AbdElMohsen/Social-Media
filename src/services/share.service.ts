import { AddPostBody, AddShareBody, IPost, Post } from "../models/post.model";
import { ObjectId } from "mongoose";

export const getPostShares = async(post: IPost) => {
    const shares = await post.populate('shareIds', {'__v': false})
    return shares
}

export const addPostShare = async(post: IPost, data: AddShareBody) => {
    const newShare = new Post({
        userId: data.userId,
        content: {
            text: data.text,
            image: data.fileName
        },
        originalPost: data.originalPost,
    })
    await newShare.populate('userId', {"__v": false, "password": false, "confirmPassword": false})
    await newShare.save()
    post.shareIds.push(newShare._id as ObjectId)
    await post.save()
    return newShare
}