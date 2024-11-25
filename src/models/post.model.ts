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
    originalPost: {type: Types.ObjectId},
    content: {
        image: { type: String, required: false },
        text: { type: String, required: false }, 
    },
    likesUserId: [{ type: Types.ObjectId, ref: 'User' }],
    commentIds: [{type: Types.ObjectId, ref: 'Comment'}],
    shareIds: [{type: Types.ObjectId, ref: 'Post'}],
}, {
    timestamps: true
})


postSchema.pre<IPost>('save', function(next) {
    if (!this.content.text && !this.content.image) {
        throw new ApiError('user should add message or image or both', 400)
    }
    next();
});

postSchema.pre(['deleteOne', 'deleteMany'], async function (next) {
    const postId: ObjectId = this.getQuery()['_id'];
    const post = await Post.findOne({ _id: postId});
    if(post!.commentIds.length != 0)
        await mongoose.model('Comment').deleteMany({ _id: { $in: post!.commentIds } });
    if(post!.shareIds.length != 0){
        await mongoose.model('Post').deleteMany({ _id: { $in: post!.shareIds } });
    }
    await mongoose.model('Post').updateOne(
        { shareIds: post!._id }, 
        { $pull: { shareIds: post!._id } } 
    );
    next();
});

export type PostContent = {
    image?: string;
    text? :string, 
}

export interface IPost extends Document{
    userId: ObjectId,
    originalPost: ObjectId,
    content: PostContent,
    likesUserId: ObjectId[],
    commentIds: ObjectId[],
    shareIds: ObjectId[],
    createdAt: Date,
    updatedAt: Date
}

export interface UpdatePostBody {
    content: PostContent
}

export interface AddPostBody  {
    userId: ObjectId,
    text: string | undefined, 
    fileName: string | undefined
}

export interface AddShareBody extends AddPostBody{
    originalPost: ObjectId
}


export const Post: Model<IPost> = mongoose.model<IPost>('Post', postSchema);

