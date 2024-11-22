import mongoose, { Model, Schema, Document, ObjectId, Types } from "mongoose"
import dotenv from 'dotenv'
import ApiError from "../errors/api.error"

dotenv.config()

const DB_URL = process.env.DB_URL

if(typeof DB_URL == 'string')
    mongoose.connect(DB_URL).then(()=> console.log('mongodb server start'))
else
    throw("DB_URL must be a satring")


const postSchema: Schema = new mongoose.Schema({
    userId: {type: Types.ObjectId, ref: 'User', required: true},
    content: {
        image: { type: String, required: false },
        text: { type: String, required: false }, 
    },
    likesUserId: [{ type: Types.ObjectId, ref: 'User' }],
    commentIds: [{type: Types.ObjectId, ref: 'Comment'}]
}, {
    timestamps: true
})


postSchema.pre<IPost>('save', function(next) {
    if (!this.content.text && !this.content.image) {
        throw new ApiError('user should add message or image or both', 400)
    }
    next();
});

export type PostContent = {
    image?: string;
    text? :string, 
}

export interface IPost extends Document{
    userId: ObjectId,
    content: PostContent,
    likesUserId: ObjectId[],
    commentIds: ObjectId[],
    createdAt: Date,
    updatedAt: Date
}

export interface UpdatePostBody {
    content: PostContent
}

export type AddPostBody = {
    userId: ObjectId,
    text: string | undefined, 
    fileName: string | undefined
}

export const Post: Model<IPost> = mongoose.model<IPost>('Post', postSchema);
