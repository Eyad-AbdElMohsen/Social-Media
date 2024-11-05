import { CreateUserData, User, IUser } from "../models/user.model"
import bcrypt from 'bcrypt'

export const getUser = (email: string) => {
    const user = User.findOne({email})
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