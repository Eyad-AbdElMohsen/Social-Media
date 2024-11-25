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
exports.addCommentReply = exports.getCommentReplies = void 0;
const comment_model_1 = require("../models/comment.model");
const mongoose_1 = __importDefault(require("mongoose"));
const getCommentReplies = (comment) => __awaiter(void 0, void 0, void 0, function* () {
    yield comment.populate('replyIds', '-__v ');
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
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    const option = { session };
    yield newReply.save(option);
    (_a = comment.replyIds) === null || _a === void 0 ? void 0 : _a.push(newReply._id);
    yield comment.save(option);
    session.commitTransaction();
    return newReply;
});
exports.addCommentReply = addCommentReply;
