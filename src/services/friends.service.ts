import { IUser } from "../models/user.model"
import ApiError from "../errors/api.error"
import { addToFriendsList, addToRequestList, removeFromFriendList, removeFromRequestList, savingData } from "../utils/friends"


export const getUserFriends = async(limit: number, skip: number, user: IUser) => {
    await user.populate('friendIds', 'email name')
    return user.friendIds
}

export const getMyReceivedRequistsList = async(me: IUser) => {
    await me.populate('receivedRequestsList', 'email name')
    return me.receivedRequestsList
}

export const getMySentRequistsList = async(me: IUser) => {
    await me.populate('sentRequestsList', 'email name')
    return me.sentRequestsList
}

//sender = me,  recipent = user 
export const addNewFriend = async(sender: IUser, recipient: IUser) => {
    if(sender._id.toString() == recipient._id.toString()) throw new ApiError('You can not send friend request to your self', 400)
    const isFriend = sender.friendIds.some((id) => id.toString() === recipient._id.toString())
    if(isFriend)throw new ApiError('You are already friends', 400)
    const isAdded = sender.sentRequestsList.some((id) => id.toString() === recipient._id.toString())
    if(isAdded)throw new ApiError('You already sent add request before', 400)
    const isReceivedBefore = recipient.sentRequestsList.some((id) => id.toString() === sender._id.toString())
    if(isReceivedBefore)throw new ApiError('This user sent you add request before', 400)
    addToRequestList(sender, recipient)
    await savingData(sender, recipient)
    return true
}

//sender = me,  recipent = user 
export const cancelAddFriend = async(sender: IUser, recipient: IUser) => {
    const isFriend = sender.friendIds.some((id) => id.toString() === recipient._id.toString())
    if(isFriend)throw new ApiError('You are already friends', 400)
    const isAdded = sender.sentRequestsList.some((id) => id.toString() === recipient._id.toString())
    if(!isAdded)throw new ApiError('You dont sent add request to this user', 400)
    removeFromRequestList(sender, recipient)
    await savingData(sender, recipient)
    return true
}

//recipent = me,  sender = user 
export const acceptNewFriend = async(recipient: IUser, sender: IUser) => {
    const isAdded = recipient.receivedRequestsList.some((id) => id.toString() === sender._id.toString())
    if(!isAdded)throw new ApiError('You didnt receive add request from this user', 400)
    removeFromRequestList(sender, recipient)
    addToFriendsList(sender, recipient)
    await savingData(sender, recipient)
    return true
}

//recipent = me,  sender = user 
export const refuseNewFriend = async(recipient: IUser, sender: IUser) => {
    const isAdded = recipient.receivedRequestsList.some((id) => id.toString() === sender._id.toString())
    if(!isAdded)throw new ApiError('You didnt receive sent add request from this user', 400)
    removeFromRequestList(sender, recipient)
    await savingData(sender, recipient)
    return true
}

export const deleteFriend = async(sender: IUser, recipient: IUser) => {
    const isFriend = sender.friendIds.some((id) => id.toString() === recipient._id.toString())
    if(!isFriend)throw new ApiError('You are not friends', 400)
    removeFromFriendList(sender, recipient)
    await savingData(sender, recipient)
    return true
}
