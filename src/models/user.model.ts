import mongoose, { Model, Schema, Document, ObjectId } from "mongoose"
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
    role: {type: String, exum: [Role.ADMIN, Role.USER], default: Role.USER}
})

export interface IUser extends Document { 
    name: string,
    email: string,
    password: string, 
    confirmPassword: string,
    role: [Role.ADMIN, Role.USER]
}

export interface CreateUserData { 
    name: string,
    email: string,
    password: string, 
    confirmPassword: string,
    role: [Role.ADMIN, Role.USER]
}

export const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);