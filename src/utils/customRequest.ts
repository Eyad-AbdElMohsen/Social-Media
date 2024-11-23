import { IComment } from '../models/comment.model'
import { IPost } from '../models/post.model'
import { IUser, JwtPayload} from '../models/user.model'
import { Request } from 'express'
import { ObjectId } from 'mongoose'

export interface CustomRequest extends Request {
    currentUser?: JwtPayload,
    post?: IPost,
    comment?: IComment,
    user?: IUser
}