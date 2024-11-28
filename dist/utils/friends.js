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
exports.savingData = exports.removeFromFriendList = exports.addToFriendsList = exports.removeFromRequestList = exports.addToRequestList = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const addToRequestList = (sender, recipient) => {
    sender.sentRequestsList.push(recipient._id);
    recipient.receivedRequestsList.push(sender._id);
};
exports.addToRequestList = addToRequestList;
const removeFromRequestList = (sender, recipient) => {
    const sentIndex = sender.sentRequestsList.indexOf(recipient._id);
    const receiveIndex = recipient.receivedRequestsList.indexOf(sender._id);
    sender.sentRequestsList.splice(sentIndex, 1);
    recipient.receivedRequestsList.splice(receiveIndex, 1);
};
exports.removeFromRequestList = removeFromRequestList;
const addToFriendsList = (sender, recipient) => {
    sender.friendIds.push(recipient._id);
    recipient.friendIds.push(sender._id);
};
exports.addToFriendsList = addToFriendsList;
const removeFromFriendList = (sender, recipient) => {
    const sentIndex = sender.friendIds.indexOf(recipient._id);
    const receiveIndex = recipient.friendIds.indexOf(sender._id);
    sender.friendIds.splice(sentIndex, 1);
    recipient.friendIds.splice(receiveIndex, 1);
};
exports.removeFromFriendList = removeFromFriendList;
// Handles saving sender and recipient data in a transactional manner to ensure ( atomicity )
const savingData = (sender, recipient) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    const option = { session };
    yield sender.save(option);
    yield recipient.save(option);
    session.commitTransaction();
});
exports.savingData = savingData;
