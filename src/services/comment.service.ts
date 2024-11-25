import { IPost } from "../models/post.model";
import { Comment, CommentCreateData, CommentEditData} from "../models/comment.model";
import{ Types, ObjectId } from 'mongoose'


export const getPostComments = async(post: IPost) => {
    await post.populate('commentIds', {'__v': false})
    return post.commentIds
}

export const getCommentById = async(commentId: Types.ObjectId) => {
    const comment = await Comment.findById(commentId)
    return comment
}

export const addPostComment = async(post: IPost, data: CommentCreateData) => {
    const newComment = new Comment({
        userId: data.userId,
        postId: data.postId,
        content: {
            text: data.content.text,
            image: data.content.fileName
        }
    })
    await newComment.save()
    post.commentIds.push(newComment._id as ObjectId)
    await post.save()
    return newComment
}

export const editPostComment = async(data: CommentEditData) => {
    await Comment.updateOne({_id: data._id}, {
        content: {
            text: data.content.text,
            image: data.content.fileName
        }
    })
    const comment = await getCommentById(data._id)
    return comment
}

export const deletePostComment = async(commentId: Types.ObjectId) => {
    await Comment.findByIdAndDelete(commentId)
}