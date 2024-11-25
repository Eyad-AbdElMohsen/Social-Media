import { CommentCreateData, IComment, Comment } from "../models/comment.model"
import mongoose, { ObjectId } from "mongoose"
export const getCommentReplies = async(comment: IComment) => {
    await comment.populate('replyIds', '-__v ')
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
    const session = await mongoose.startSession()
    session.startTransaction()
    const option = { session }
    await newReply.save(option)
    comment.replyIds?.push(newReply._id as ObjectId)
    await comment.save(option)
    session.commitTransaction()
    return newReply
}