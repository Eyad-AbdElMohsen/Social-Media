import { CommentCreateData, IComment, Comment } from "../models/comment.model"
import { ObjectId } from "mongoose"

export const getCommentReplies = async(comment: IComment) => {
    await comment.populate('replyIds', {'__v': false})
    return comment.replyIds
}

export const addCommentReply = async(comment: IComment, data: CommentCreateData) => {
    const newReply = new Comment({
        userId: data.userId,
        postId: data.postId,
        content: {
            text: data.content.text,
            image: data.content.fileName
        }
    })
    await newReply.save()
    comment.replyIds?.push(newReply._id as ObjectId)
    await comment.save()
    return newReply
}