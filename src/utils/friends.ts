import mongoose from "mongoose";
import { IUser } from "../models/user.model";


export const addToRequestList = (sender: IUser, recipient: IUser) => {
    sender.sentRequestsList.push(recipient._id)
    recipient.receivedRequestsList.push(sender._id)
}

export const removeFromRequestList = (sender: IUser, recipient: IUser) => {
    let sentIndex = sender.sentRequestsList.indexOf(recipient._id);
    let receiveIndex = recipient.receivedRequestsList.indexOf(sender._id);
    sender.sentRequestsList.splice(sentIndex, 1);
    recipient.receivedRequestsList.splice(receiveIndex, 1);
}

export const addToFriendsList = (sender: IUser, recipient: IUser) => {
    sender.friendIds.push(recipient._id)
    recipient.friendIds.push(sender._id)
}

export const removeFromFriendList = (sender: IUser, recipient: IUser) => {
    let sentIndex = sender.friendIds.indexOf(recipient._id);
    let receiveIndex = recipient.friendIds.indexOf(sender._id);
    sender.friendIds.splice(sentIndex, 1);
    recipient.friendIds.splice(receiveIndex, 1);
}

export const savingData = async(sender: IUser, recipient: IUser) => {
    const session = await mongoose.startSession()
    session.startTransaction()
    const option = { session }
    await sender.save(option)
    await recipient.save(option)
    session.commitTransaction()
}


