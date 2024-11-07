import { CreateUserData, User, IUser } from "../models/user.model"
import bcrypt from 'bcrypt'
import { generateJWT } from "../utils/generateJWT"


export const getAllUsers = async(limit: number, skip: number) => {
    const users = await User.find({}, {"__v": false, "confirmPassword": false}).limit(limit).skip(skip)
    return users
}

export const getUser = async(email: string) => {
    const user = await User.findOne({email})
    return user
}

export const postSignup = async (data: CreateUserData) => {
    const hashedPassword = await bcrypt.hash(data.password, 10)
    const newUser = new User({
        ...data,
        password: hashedPassword,
        confirmPassword: hashedPassword
    })
    await newUser.save()
    return newUser
}

export const correctPassword = async(password: string, user: IUser) => {
    return await bcrypt.compare(password, user.password)
}

export const login = async(user: IUser) => {
    const token = await generateJWT({email: user.email, id: user._id, role: user.role})
    user.token = token
    return token
}
