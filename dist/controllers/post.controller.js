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
exports.addPostShare = exports.getPostShares = exports.addCommentReply = exports.getCommentReplies = exports.deletePostComment = exports.editPostComment = exports.addPostComment = exports.getPostComment = exports.getPostComments = exports.removeLike = exports.likePost = exports.getPostLikes = exports.deletePost = exports.editPost = exports.getPost = exports.getAllPosts = exports.addPost = void 0;
const asyncWrapper_middleware_1 = __importDefault(require("../middlewares/asyncWrapper.middleware"));
const postServices = __importStar(require("../services/post.service"));
const likeServices = __importStar(require("../services/like.service"));
const commentService = __importStar(require("../services/comment.service"));
const replyService = __importStar(require("../services/reply.service"));
const shareService = __importStar(require("../services/share.service"));
const httpStatusText_1 = require("../utils/httpStatusText");
const api_error_1 = __importDefault(require("../errors/api.error"));
const mongoose_1 = require("mongoose");
exports.addPost = (0, asyncWrapper_middleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.log((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename);
    const newPost = yield postServices.addPost({
        userId: req.currentUser.id,
        text: req.body.text,
        fileName: (_b = req.file) === null || _b === void 0 ? void 0 : _b.filename
    });
    res.status(200).json({
        status: httpStatusText_1.SUCCESS,
        data: { newPost }
    });
}));
exports.getAllPosts = (0, asyncWrapper_middleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = Number(req.query.limit);
    const skip = Number(req.query.skip);
    const posts = yield postServices.getAllPosts(limit, skip);
    res.status(200).json({
        status: httpStatusText_1.SUCCESS,
        data: posts.map((post, index) => ({
            postNumber: index + 1,
            post: {
                _id: post._id,
                userId: post.userId,
                content: post.content,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt
            }
        })),
    });
}));
exports.getPost = (0, asyncWrapper_middleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = req.post;
    res.status(200).json({
        status: httpStatusText_1.SUCCESS,
        data: { post }
    });
}));
exports.editPost = (0, asyncWrapper_middleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const post = req.post;
    yield postServices.editPost(req.post, {
        content: {
            text: req.body.text,
            image: (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename
        }
    });
    res.status(200).json({
        status: httpStatusText_1.SUCCESS,
        data: { post }
    });
}));
exports.deletePost = (0, asyncWrapper_middleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield postServices.deletePost(req.params.postId);
    res.status(200).json({
        status: httpStatusText_1.SUCCESS,
        data: null
    });
}));
exports.getPostLikes = (0, asyncWrapper_middleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let users = likeServices.getPostLikes(req.post);
    let numberOfLikes = likeServices.getNumberOfLikes(req.post);
    res.status(200).json({
        status: httpStatusText_1.SUCCESS,
        data: {
            numberOfLikes,
            users
        }
    });
}));
exports.likePost = (0, asyncWrapper_middleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userId = req.currentUser.id;
    let isLiked = likeServices.isLiked(req.post, userId);
    if (isLiked)
        throw new api_error_1.default('This user liked the post before', 409, 'likePost middleware in post controller file', { id: req.params.postId });
    let tryLike = yield likeServices.likePost(userId, req.post);
    if (!tryLike)
        throw new Error('Failed');
    res.status(200).json({ status: httpStatusText_1.SUCCESS });
}));
exports.removeLike = (0, asyncWrapper_middleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userId = req.currentUser.id;
    let isLiked = likeServices.isLiked(req.post, userId);
    if (!isLiked)
        throw new api_error_1.default('This user is already not like the post before', 409, 'removeLike middleware in post controller file', { id: req.params.postId });
    yield likeServices.removeLike(userId, req.post);
    res.status(200).json({ status: httpStatusText_1.SUCCESS });
}));
exports.getPostComments = (0, asyncWrapper_middleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let comments = yield commentService.getPostComments(req.post);
    res.status(200).json({
        status: httpStatusText_1.SUCCESS,
        data: comments.map((comment, index) => ({
            commentNumber: index + 1,
            comment
        })),
    });
}));
exports.getPostComment = (0, asyncWrapper_middleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = req.comment;
    res.status(200).json({
        status: httpStatusText_1.SUCCESS,
        data: comment
    });
}));
exports.addPostComment = (0, asyncWrapper_middleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const postId = new mongoose_1.Types.ObjectId(req.params.postId);
    let newComment = yield commentService.addPostComment(req.post, {
        userId: req.currentUser.id,
        postId: postId,
        content: {
            text: req.body.text,
            fileName: (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename
        }
    });
    res.status(200).json({
        status: httpStatusText_1.SUCCESS,
        data: { newComment }
    });
}));
exports.editPostComment = (0, asyncWrapper_middleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let commentId = new mongoose_1.Types.ObjectId(req.params.commentId);
    const commentAfterEdit = yield commentService.editPostComment({
        userId: req.currentUser.id,
        content: {
            text: req.body.text,
            fileName: (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename
        },
        _id: commentId
    });
    res.status(200).json({ satus: httpStatusText_1.SUCCESS, data: { commentAfterEdit } });
}));
exports.deletePostComment = (0, asyncWrapper_middleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let commentId = new mongoose_1.Types.ObjectId(req.params.commentId);
    yield commentService.deletePostComment(commentId);
    res.status(200).json({ satus: httpStatusText_1.SUCCESS, data: null });
}));
exports.getCommentReplies = (0, asyncWrapper_middleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let replies = yield replyService.getCommentReplies(req.comment);
    res.status(200).json({
        status: httpStatusText_1.SUCCESS,
        data: replies.map((reply, index) => ({
            replyNumber: index + 1,
            reply,
        })),
    });
}));
exports.addCommentReply = (0, asyncWrapper_middleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const postId = new mongoose_1.Types.ObjectId(req.params.postId);
    let newReply = yield replyService.addCommentReply(req.comment, {
        userId: req.currentUser.id,
        postId: postId,
        content: {
            text: req.body.text,
            fileName: (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename
        }
    });
    res.status(200).json({
        status: httpStatusText_1.SUCCESS,
        data: { newReply }
    });
}));
exports.getPostShares = (0, asyncWrapper_middleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shares = yield shareService.getPostShares(req.post);
    res.status(200).json({
        status: httpStatusText_1.SUCCESS,
        data: { shares }
    });
}));
exports.addPostShare = (0, asyncWrapper_middleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (req.me._id.toString() === req.post.userId.toString())
        throw new api_error_1.default('You can not share your post', 400);
    const newShare = yield shareService.addPostShare(req.post, {
        userId: req.currentUser.id,
        text: req.body.text,
        fileName: (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename,
        originalPost: req.post._id
    });
    res.status(200).json({
        status: httpStatusText_1.SUCCESS,
        data: { newShare }
    });
}));
