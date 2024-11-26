import { Types, Schema } from "mongoose";
import { Post, AddPostBody, UpdatePostBody, IPost } from "../models/post.model";


export const addPost = async(data : AddPostBody) => {
    let newPost = new Post({
        userId: data.userId,
        content: {
            text: data.text,
            image: data.fileName
        }
    })
    await newPost.save() 
    return newPost
}

export const getAllPosts = async(limit: number, skip: number) => {
    const posts = await Post.find({}, {'__v': false}).limit(limit).skip(skip).populate('userId', 'email _id role')
    return posts
}


export const getUserPosts = async(limit: number, skip: number, userId: Types.ObjectId | Schema.Types.ObjectId)=> {
    const posts = await Post.find({userId}, {'__v': false}).limit(limit).skip(skip)
    return posts
}

export const getPost = async(id: Types.ObjectId) => {
    const post = await Post.findById(id)
    return post
}

export const editPost = async(post: IPost, body: UpdatePostBody) => {
    post.content.text = body.content.text ?? post.content.text
    post.content.image = body.content.image ?? post.content.image
    await post.save()
    return post
}

export const deletePost = async(id: string) => {
    await Post.deleteOne({_id: id})
}