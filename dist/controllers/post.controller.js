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
exports.removeLike = exports.likePost = exports.getPostLikes = exports.deletePost = exports.editPost = exports.getPost = exports.getAllPosts = exports.addPost = void 0;
const asyncWrapper_middleware_1 = __importDefault(require("../middlewares/asyncWrapper.middleware"));
const postServices = __importStar(require("../services/post.service"));
const likeServices = __importStar(require("../services/like.service"));
const httpStatusText_1 = require("../utils/httpStatusText");
const api_error_1 = __importDefault(require("../errors/api.error"));
exports.addPost = (0, asyncWrapper_middleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const newPost = yield postServices.addPost({
        userId: req.currentUser.id,
        text: req.body.text,
        fileName: (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename
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
        data: { posts }
    });
}));
exports.getPost = (0, asyncWrapper_middleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield postServices.getPost(req.params.postId);
    if (!post) {
        throw new api_error_1.default('This id has no available post', 404, req.path, { id: req.params.postId });
    }
    res.status(200).json({
        status: httpStatusText_1.SUCCESS,
        data: { post }
    });
}));
exports.editPost = (0, asyncWrapper_middleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let post = yield postServices.getPost(req.params.postId);
    if (!post) {
        throw new api_error_1.default('This id has no available post', 404, req.path, { id: req.params.postId });
    }
    yield postServices.editPost(post, {
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
    let post = yield postServices.getPost(req.params.postId);
    if (!post) {
        throw new api_error_1.default('This id has no available post', 404, req.path, { id: req.params.postId });
    }
    yield postServices.deletePost(req.params.postId);
    res.status(200).json({
        status: httpStatusText_1.SUCCESS,
        data: null
    });
}));
exports.getPostLikes = (0, asyncWrapper_middleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let post = yield postServices.getPost(req.params.postId);
    if (!post)
        throw new api_error_1.default('This id has no available post', 404, req.path, { id: req.params.postId });
    let users = likeServices.getPostLikes(post);
    let numberOfLikes = likeServices.getNumberOfLikes(post);
    res.status(200).json({
        status: httpStatusText_1.SUCCESS,
        data: {
            numberOfLikes,
            users
        }
    });
}));
exports.likePost = (0, asyncWrapper_middleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let post = yield postServices.getPost(req.params.postId);
    if (!post)
        throw new api_error_1.default('This id has no available post', 404, req.path, { id: req.params.postId });
    let userId = req.currentUser.id;
    let isLiked = likeServices.isLiked(post, userId);
    if (isLiked)
        throw new api_error_1.default('This user liked the post before', 409, req.path, { id: req.params.postId });
    let tryLike = yield likeServices.likePost(userId, post);
    if (!tryLike)
        throw new Error('Failed');
    res.status(200).json({ status: httpStatusText_1.SUCCESS });
}));
exports.removeLike = (0, asyncWrapper_middleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let post = yield postServices.getPost(req.params.postId);
    if (!post)
        throw new api_error_1.default('This id has no available post', 404, req.path, { id: req.params.postId });
    let userId = req.currentUser.id;
    let isLiked = likeServices.isLiked(post, userId);
    if (!isLiked)
        throw new api_error_1.default('This user is already not like the post before', 409, req.path, { id: req.params.postId });
    yield likeServices.removeLike(userId, post);
    res.status(200).json({ status: httpStatusText_1.SUCCESS });
}));