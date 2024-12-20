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
exports.addPostShare = exports.getPostShares = void 0;
const api_error_1 = __importDefault(require("../errors/api.error"));
const post_model_1 = require("../models/post.model");
const mongoose_1 = __importDefault(require("mongoose"));
const getPostShares = (post) => __awaiter(void 0, void 0, void 0, function* () {
    const shares = yield post.populate('shareIds', { '__v': false });
    return shares.shareIds;
});
exports.getPostShares = getPostShares;
const addPostShare = (post, data) => __awaiter(void 0, void 0, void 0, function* () {
    const oldPost = yield post_model_1.Post.find({ userId: data.userId, originalPost: data.originalPost });
    if (oldPost.length)
        throw new api_error_1.default('You can not share same post twice', 400);
    const newShare = new post_model_1.Post({
        userId: data.userId,
        content: {
            text: data.text,
            image: data.fileName
        },
        originalPost: data.originalPost,
    });
    yield newShare.populate('userId', '_id email role');
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    const option = { session };
    yield newShare.save(option);
    post.shareIds.push(newShare._id);
    yield post.save(option);
    session.commitTransaction();
    return newShare;
});
exports.addPostShare = addPostShare;
