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
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeLike = exports.likePost = exports.isLiked = exports.getNumberOfLikes = exports.getPostLikes = void 0;
const getPostLikes = (post) => {
    let users = post.likesUserId;
    return users;
};
exports.getPostLikes = getPostLikes;
const getNumberOfLikes = (post) => {
    let numberOfLikes = post.likesUserId.length;
    return numberOfLikes;
};
exports.getNumberOfLikes = getNumberOfLikes;
const isLiked = (post, userId) => {
    const isLiked = post.likesUserId.find((user) => user == userId);
    if (isLiked)
        return true;
    return false;
};
exports.isLiked = isLiked;
const likePost = (userId, post) => __awaiter(void 0, void 0, void 0, function* () {
    post.likesUserId.push(userId);
    yield post.save();
    return true;
});
exports.likePost = likePost;
const removeLike = (userId, post) => __awaiter(void 0, void 0, void 0, function* () {
    let index = post.likesUserId.indexOf(userId);
    post.likesUserId.splice(index, 1);
    yield post.save();
    return true;
});
exports.removeLike = removeLike;
