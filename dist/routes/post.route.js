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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../middlewares/verifyToken");
const postController = __importStar(require("../controllers/post.controller"));
const multer_1 = require("../utils/multer");
const allowedTo_1 = require("../middlewares/allowedTo");
const userRole_1 = require("../utils/userRole");
const pagination_middleware_1 = require("../middlewares/pagination.middleware");
const isPostOwner_1 = require("../middlewares/isPostOwner");
const postRouter = (0, express_1.Router)();
postRouter.route('/posts/:postId')
    .get(verifyToken_1.verifyToken, postController.getPost)
    .patch(verifyToken_1.verifyToken, isPostOwner_1.isPostOwner, multer_1.upload.single('image'), postController.editPost)
    .delete(verifyToken_1.verifyToken, isPostOwner_1.isPostOwner, postController.deletePost);
postRouter.route('/posts')
    .get(verifyToken_1.verifyToken, (0, allowedTo_1.allowedTo)([userRole_1.Role.ADMIN]), pagination_middleware_1.pagination, postController.getAllPosts)
    .post(verifyToken_1.verifyToken, multer_1.upload.single('image'), postController.addPost);
postRouter.route('/posts/likes/:postId')
    .get(verifyToken_1.verifyToken, postController.getPostLikes)
    .post(verifyToken_1.verifyToken, postController.likePost)
    .delete(verifyToken_1.verifyToken, postController.removeLike);
exports.default = postRouter;
