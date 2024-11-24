"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFriend = exports.refuseNewFriend = exports.acceptNewFriend = exports.cancelAddFriend = exports.addNewFriend = exports.getMySentRequistsList = exports.getMyReceivedRequistsList = exports.getUserFriends = void 0;
const api_error_1 = __importDefault(require("../errors/api.error"));
const friends_1 = require("../utils/friends");
const getUserFriends = (limit, skip, user) => __awaiter(void 0, void 0, void 0, function* () {
    yield user.populate('friendIds', 'email name');
    return user.friendIds;
});
exports.getUserFriends = getUserFriends;
const getMyReceivedRequistsList = (me) => __awaiter(void 0, void 0, void 0, function* () {
    yield me.populate('receivedRequestsList', 'email name');
    return me.receivedRequestsList;
});
exports.getMyReceivedRequistsList = getMyReceivedRequistsList;
const getMySentRequistsList = (me) => __awaiter(void 0, void 0, void 0, function* () {
    yield me.populate('sentRequestsList', 'email name');
    return me.sentRequestsList;
});
exports.getMySentRequistsList = getMySentRequistsList;
//sender = me,  recipent = user 
const addNewFriend = (sender, recipient) => __awaiter(void 0, void 0, void 0, function* () {
    if (sender._id.toString() == recipient._id.toString())
        throw new api_error_1.default('You can not send friend request to your self', 400);
    const isFriend = sender.friendIds.some((id) => id.toString() === recipient._id.toString());
    if (isFriend)
        throw new api_error_1.default('You are already friends', 400);
    const isAdded = sender.sentRequestsList.some((id) => id.toString() === recipient._id.toString());
    if (isAdded)
        throw new api_error_1.default('You already sent add request before', 400);
    const isReceivedBefore = recipient.sentRequestsList.some((id) => id.toString() === sender._id.toString());
    if (isReceivedBefore)
        throw new api_error_1.default('This user sent you add request before', 400);
    (0, friends_1.addToRequestList)(sender, recipient);
    yield (0, friends_1.savingData)(sender, recipient);
    return true;
});
exports.addNewFriend = addNewFriend;
//sender = me,  recipent = user 
const cancelAddFriend = (sender, recipient) => __awaiter(void 0, void 0, void 0, function* () {
    const isFriend = sender.friendIds.some((id) => id.toString() === recipient._id.toString());
    if (isFriend)
        throw new api_error_1.default('You are already friends', 400);
    const isAdded = sender.sentRequestsList.some((id) => id.toString() === recipient._id.toString());
    if (!isAdded)
        throw new api_error_1.default('You dont sent add request to this user', 400);
    (0, friends_1.removeFromRequestList)(sender, recipient);
    yield (0, friends_1.savingData)(sender, recipient);
    return true;
});
exports.cancelAddFriend = cancelAddFriend;
//recipent = me,  sender = user 
const acceptNewFriend = (recipient, sender) => __awaiter(void 0, void 0, void 0, function* () {
    const isAdded = recipient.receivedRequestsList.some((id) => id.toString() === sender._id.toString());
    if (!isAdded)
        throw new api_error_1.default('You didnt receive add request from this user', 400);
    (0, friends_1.removeFromRequestList)(sender, recipient);
    (0, friends_1.addToFriendsList)(sender, recipient);
    yield (0, friends_1.savingData)(sender, recipient);
    return true;
});
exports.acceptNewFriend = acceptNewFriend;
//recipent = me,  sender = user 
const refuseNewFriend = (recipient, sender) => __awaiter(void 0, void 0, void 0, function* () {
    const isAdded = recipient.receivedRequestsList.some((id) => id.toString() === sender._id.toString());
    if (!isAdded)
        throw new api_error_1.default('You didnt receive sent add request from this user', 400);
    (0, friends_1.removeFromRequestList)(sender, recipient);
    yield (0, friends_1.savingData)(sender, recipient);
    return true;
});
exports.refuseNewFriend = refuseNewFriend;
const deleteFriend = (sender, recipient) => __awaiter(void 0, void 0, void 0, function* () {
    const isFriend = sender.friendIds.some((id) => id.toString() === recipient._id.toString());
    if (!isFriend)
        throw new api_error_1.default('You are not friends', 400);
    (0, friends_1.removeFromFriendList)(sender, recipient);
    yield (0, friends_1.savingData)(sender, recipient);
    return true;
});
exports.deleteFriend = deleteFriend;
