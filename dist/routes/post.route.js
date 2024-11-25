"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../middlewares/verifyToken");
const postController = __importStar(require("../controllers/post.controller"));
const multer_1 = require("../utils/multer");
const allowedTo_1 = require("../middlewares/allowedTo");
const userRole_1 = require("../utils/userRole");
const pagination_middleware_1 = require("../middlewares/pagination.middleware");
const isOwner_1 = require("../middlewares/isOwner");
const isValid_1 = require("../middlewares/isValid");
const isIFrend_1 = require("../middlewares/isIFrend");
const getMe_1 = __importDefault(require("../middlewares/getMe"));
const postRouter = (0, express_1.Router)();
postRouter.route('/posts')
    .get(verifyToken_1.verifyToken, (0, allowedTo_1.allowedTo)([userRole_1.Role.ADMIN]), pagination_middleware_1.pagination, postController.getAllPosts)
    .post(verifyToken_1.verifyToken, multer_1.upload.single('image'), postController.addPost);
// to delete, edit and get a post (or a share)
postRouter.route('/posts/:postId')
    .get(verifyToken_1.verifyToken, getMe_1.default, isValid_1.isValidPost, isIFrend_1.isIFriendOfUser, postController.getPost)
    .patch(verifyToken_1.verifyToken, isValid_1.isValidPost, isOwner_1.isPostOwner, multer_1.upload.single('image'), postController.editPost)
    .delete(verifyToken_1.verifyToken, isValid_1.isValidPost, isOwner_1.isPostOwner, postController.deletePost);
postRouter.route('/posts/:postId/likes')
    .get(verifyToken_1.verifyToken, getMe_1.default, isValid_1.isValidPost, isIFrend_1.isIFriendOfUser, postController.getPostLikes)
    .post(verifyToken_1.verifyToken, getMe_1.default, isValid_1.isValidPost, isIFrend_1.isIFriendOfUser, postController.likePost)
    .delete(verifyToken_1.verifyToken, isValid_1.isValidPost, postController.removeLike);
postRouter.route('/posts/:postId/comments')
    .get(verifyToken_1.verifyToken, getMe_1.default, isValid_1.isValidPost, isIFrend_1.isIFriendOfUser, postController.getPostComments)
    .post(verifyToken_1.verifyToken, getMe_1.default, isValid_1.isValidPost, isIFrend_1.isIFriendOfUser, multer_1.upload.single('image'), postController.addPostComment);
// to delete, edit and get a comment (or a reply)
postRouter.route('/posts/:postId/comments/:commentId')
    .get(verifyToken_1.verifyToken, getMe_1.default, isValid_1.isValidPost, isValid_1.isValidComment, isIFrend_1.isIFriendOfUser, postController.getPostComment)
    .patch(verifyToken_1.verifyToken, isValid_1.isValidPost, isValid_1.isValidComment, isOwner_1.isCommentOwner, multer_1.upload.single('image'), postController.editPostComment)
    .delete(verifyToken_1.verifyToken, isValid_1.isValidPost, isValid_1.isValidComment, isOwner_1.isCommentOwner, postController.deletePostComment);
postRouter.route('/posts/:postId/comments/:commentId/replies')
    .get(verifyToken_1.verifyToken, getMe_1.default, isValid_1.isValidPost, isIFrend_1.isIFriendOfUser, isValid_1.isValidComment, postController.getCommentReplies)
    .post(verifyToken_1.verifyToken, getMe_1.default, isValid_1.isValidPost, isIFrend_1.isIFriendOfUser, isValid_1.isValidComment, multer_1.upload.single('image'), postController.addCommentReply);
postRouter.route('/posts/:postId/shares')
    .get(verifyToken_1.verifyToken, getMe_1.default, isValid_1.isValidPost, isIFrend_1.isIFriendOfUser, postController.getPostShares)
    .post(verifyToken_1.verifyToken, getMe_1.default, isValid_1.isValidPost, isIFrend_1.isIFriendOfUser, multer_1.upload.single('image'), postController.addPostShare);
exports.default = postRouter;
