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
exports.addCommentReply = exports.getCommentReplies = void 0;
const comment_model_1 = require("../models/comment.model");
const getCommentReplies = (comment) => __awaiter(void 0, void 0, void 0, function* () {
    yield comment.populate('replyIds', { '__v': false });
    return comment.replyIds;
});
exports.getCommentReplies = getCommentReplies;
const addCommentReply = (comment, data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const newReply = new comment_model_1.Comment({
        userId: data.userId,
        postId: data.postId,
        content: {
            text: data.content.text,
            image: data.content.fileName
        }
    });
    yield newReply.save();
    (_a = comment.replyIds) === null || _a === void 0 ? void 0 : _a.push(newReply._id);
    yield comment.save();
    return newReply;
});
exports.addCommentReply = addCommentReply;
