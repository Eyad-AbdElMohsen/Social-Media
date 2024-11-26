import mongoose from "mongoose";
import { IUser } from "../models/user.model";


export const addToRequestList = (sender: IUser, recipient: IUser) => {
    sender.sentRequestsList.push(recipient._id)
    recipient.receivedRequestsList.push(sender._id)
}

export const removeFromRequestList = (sender: IUser, recipient: IUser) => {
    const sentIndex = sender.sentRequestsList.indexOf(recipient._id);
    const receiveIndex = recipient.receivedRequestsList.indexOf(sender._id);
    sender.sentRequestsList.splice(sentIndex, 1);
    recipient.receivedRequestsList.splice(receiveIndex, 1);
}

export const addToFriendsList = (sender: IUser, recipient: IUser) => {
    sender.friendIds.push(recipient._id)
    recipient.friendIds.push(sender._id)
}

export const removeFromFriendList = (sender: IUser, recipient: IUser) => {
    const sentIndex = sender.friendIds.indexOf(recipient._id);
    const receiveIndex = recipient.friendIds.indexOf(sender._id);
    sender.friendIds.splice(sentIndex, 1);
    recipient.friendIds.splice(receiveIndex, 1);
}

// Handles saving sender and recipient data in a transactional manner to ensure ( atomicity )
export const savingData = async(sender: IUser, recipient: IUser) => {
    const session = await mongoose.startSession()
    session.startTransaction()
    const option = { session }
    await sender.save(option)
    await recipient.save(option)
    session.commitTransaction()
}


