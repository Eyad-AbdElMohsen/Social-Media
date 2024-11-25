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
exports.deletePost = exports.editPost = exports.getPost = exports.getUserPosts = exports.getAllPosts = exports.addPost = void 0;
const post_model_1 = require("../models/post.model");
const addPost = (data) => __awaiter(void 0, void 0, void 0, function* () {
    let newPost = new post_model_1.Post({
        userId: data.userId,
        content: {
            text: data.text,
            image: data.fileName
        }
    });
    yield newPost.save();
    return newPost;
});
exports.addPost = addPost;
const getAllPosts = (limit, skip) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield post_model_1.Post.find({}, { '__v': false }).limit(limit).skip(skip).populate('userId', 'email _id role');
    return posts;
});
exports.getAllPosts = getAllPosts;
const getUserPosts = (limit, skip, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield post_model_1.Post.find({ userId }, { '__v': false }).limit(limit).skip(skip);
    return posts;
});
exports.getUserPosts = getUserPosts;
const getPost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield post_model_1.Post.findById(id);
    return post;
});
exports.getPost = getPost;
const editPost = (post, body) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    post.content.text = (_a = body.content.text) !== null && _a !== void 0 ? _a : post.content.text;
    post.content.image = (_b = body.content.image) !== null && _b !== void 0 ? _b : post.content.image;
    yield post.save();
    return post;
});
exports.editPost = editPost;
const deletePost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield post_model_1.Post.deleteOne({ _id: id });
});
exports.deletePost = deletePost;
