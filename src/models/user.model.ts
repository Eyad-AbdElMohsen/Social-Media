import mongoose, { Model, Schema, Document, ObjectId, Types } from "mongoose"
import dotenv from 'dotenv'
import { Role } from "../utils/userRole"

dotenv.config()

const DB_URL = process.env.DB_URL

if(typeof DB_URL == 'string')
    mongoose.connect(DB_URL).then(()=> console.log('mongodb server start'))
else
    throw("DB_URL must be a satring")

const userSchema: Schema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    confirmPassword: {type: String, required: true},
    role: {type: String, exum: [Role.ADMIN, Role.USER], default: Role.USER},
    friendIds: [{type: Types.ObjectId, ref: 'User'}],
    sentRequestsList: [{type: Types.ObjectId, ref: 'User'}],
    receivedRequestsList: [{type: Types.ObjectId, ref: 'User'}],
})

export interface IUser extends Document { 
    name: string,
    email: string,
    password: string, 
    confirmPassword: string,
    role: Role,
    _id: ObjectId,
    token?: string,
    friendIds: ObjectId[],
    sentRequestsList: ObjectId[],
    receivedRequestsList: ObjectId[]
}

export interface CreateUserData { 
    name: string,
    email: string,
    password: string, 
    confirmPassword: string,
    role: [Role.ADMIN, Role.USER],
    _id: ObjectId
}
export interface JwtPayload {
    email: string;
    role: Role,
    id: ObjectId
}


export const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);