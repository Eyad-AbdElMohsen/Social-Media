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
exports.isValidComment = exports.isValidPost = void 0;
const mongoose_1 = require("mongoose");
const post_service_1 = require("../services/post.service");
const asyncWrapper_middleware_1 = __importDefault(require("./asyncWrapper.middleware"));
const api_error_1 = __importDefault(require("../errors/api.error"));
const comment_service_1 = require("../services/comment.service");
exports.isValidPost = (0, asyncWrapper_middleware_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield (0, post_service_1.getPost)(new mongoose_1.Types.ObjectId(req.params.postId));
    if (!post)
        throw new api_error_1.default('This id has no available post', 404, req.path, { id: req.params.postId });
    req.post = post;
    next();
}));
exports.isValidComment = (0, asyncWrapper_middleware_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let comment = yield (0, comment_service_1.getCommentById)(new mongoose_1.Types.ObjectId(req.params.commentId));
    if (!comment)
        throw new api_error_1.default('This id has no available comment', 404, req.path, { id: req.params.commentId });
    req.comment = comment;
    next();
}));
