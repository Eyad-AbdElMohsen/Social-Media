import { NextFunction, Response } from "express";
import { CustomRequest } from "../utils/customRequest";
import asyncWrapper from "./asyncWrapper.middleware";
import ApiError from "../errors/api.error";


export const isIFriendOfUser = asyncWrapper(async(req: CustomRequest, res: Response, next: NextFunction) => {
    const me = req.me
    const user = req.user
    const isFriends = me!.friendIds.some(id => id.toString() == user!._id.toString())
    if(!isFriends)throw new ApiError('You are not friend of this user', 400)
    next()
})