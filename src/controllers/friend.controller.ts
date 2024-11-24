import { Response } from "express";
import asyncWrapper from "../middlewares/asyncWrapper.middleware";
import { SUCCESS } from "../utils/httpStatusText";
import { CustomRequest } from "../utils/customRequest";
import * as friendServices from '../services/friends.service'



export const getMyReceivedRequistsList = asyncWrapper( async(req: CustomRequest, res: Response) => {
    const list = await friendServices.getMyReceivedRequistsList(req.me!)
    res.status(200).json({
        status: SUCCESS,
        data: {list}
    })
})

export const getMySentRequistsList = asyncWrapper( async(req: CustomRequest, res: Response) => {
    const list = await friendServices.getMySentRequistsList(req.me!)
    res.status(200).json({
        status: SUCCESS,
        data: {list}
    })
})

export const addNewFriend = asyncWrapper( async(req: CustomRequest, res: Response) => {
    await friendServices.addNewFriend(req.me!, req.user!)
    res.status(200).json({status: SUCCESS})
})

export const cancelAddFriend = asyncWrapper( async(req: CustomRequest, res: Response) => {
    await friendServices.cancelAddFriend(req.me!, req.user!)
    res.status(200).json({status: SUCCESS})
})


export const acceptNewFriend = asyncWrapper( async(req: CustomRequest, res: Response) => {
    const friends = [req.me!, req.user!]
    await friendServices.acceptNewFriend(req.me!, req.user!)
    res.status(200).json({status: SUCCESS, data: {friends}})
})


export const refuseNewFriend = asyncWrapper( async(req: CustomRequest, res: Response) => {
    await friendServices.refuseNewFriend(req.me!, req.user!)
    res.status(200).json({status: SUCCESS})
})


export const deleteFriend =  asyncWrapper( async(req: CustomRequest, res: Response) => {
    await friendServices.deleteFriend(req.me!, req.user!)
    res.status(200).json({status: SUCCESS})
})
