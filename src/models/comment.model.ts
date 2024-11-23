import mongoose, { Model, Schema, Document, ObjectId, Types } from "mongoose"
import dotenv from 'dotenv'
import ApiError from "../errors/api.error"

dotenv.config()

const DB_URL = process.env.DB_URL

if(typeof DB_URL == 'string')
    mongoose.connect(DB_URL).then(()=> console.log('mongodb server start'))
else
    throw("DB_URL must be a satring")

export const commentSchema: Schema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    content: {
        image: { type: String, required: false },
        text: { type: String, required: false }, 
    },
    replyIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
}, {
    timestamps: true
})

commentSchema.pre<IComment>('save', function(next) {
    if (!this.content.text && !this.content.image) {
        throw new ApiError('user should add message or image or both', 400)
    }
    next();
});

export interface IComment extends Document {
    userId: ObjectId,
    content: {
        image?: string,
        text?: string
    };
    replyIds?: ObjectId[],
    createdAt: Date,
    updatedAt: Date
}

export interface CommentCreateData {
    userId: ObjectId,
    content: {
        text?: string,
        fileName?: string
    }
}

export interface CommentEditData {
    userId: ObjectId,
    content: {
        text?: string,
        fileName?: string
    },
    _id: Types.ObjectId
}

export const Comment: Model<IComment> = mongoose.model<IComment>('Comment', commentSchema);
