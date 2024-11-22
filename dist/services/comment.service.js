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
exports.deletePostComment = exports.editPostComment = exports.addPostComment = exports.getCommentById = exports.getPostComments = void 0;
const comment_model_1 = require("../models/comment.model");
const getPostComments = (post) => __awaiter(void 0, void 0, void 0, function* () {
    yield post.populate('commentIds', { '__v': false });
    return post.commentIds;
});
exports.getPostComments = getPostComments;
const getCommentById = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield comment_model_1.Comment.findById(commentId);
    return comment;
});
exports.getCommentById = getCommentById;
const addPostComment = (post, data) => __awaiter(void 0, void 0, void 0, function* () {
    const newComment = new comment_model_1.Comment({
        userId: data.userId,
        content: {
            text: data.content.text,
            image: data.content.fileName
        }
    });
    yield newComment.save();
    post.commentIds.push(newComment._id);
    yield post.save();
    return newComment;
});
exports.addPostComment = addPostComment;
const editPostComment = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield comment_model_1.Comment.updateOne({ _id: data._id }, {
        content: {
            text: data.content.text,
            image: data.content.fileName
        }
    });
    const comment = yield (0, exports.getCommentById)(data._id);
    return comment;
});
exports.editPostComment = editPostComment;
const deletePostComment = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
    yield comment_model_1.Comment.findByIdAndDelete(commentId);
});
exports.deletePostComment = deletePostComment;
