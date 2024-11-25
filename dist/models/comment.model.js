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
exports.Comment = exports.commentSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const api_error_1 = __importDefault(require("../errors/api.error"));
dotenv_1.default.config();
const DB_URL = process.env.DB_URL;
if (typeof DB_URL == 'string')
    mongoose_1.default.connect(DB_URL).then(() => console.log('mongodb server start'));
else
    throw ("DB_URL must be a satring");
exports.commentSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    postId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Post', required: true },
    content: {
        image: { type: String, required: false },
        text: { type: String, required: false },
    },
    replyIds: [{ type: mongoose_1.Types.ObjectId, ref: 'Comment' }],
}, {
    timestamps: true
});
exports.commentSchema.pre('save', function (next) {
    if (!this.content.text && !this.content.image) {
        throw new api_error_1.default('user should add message or image or both', 400);
    }
    next();
});
exports.commentSchema.pre(['findOneAndDelete', 'deleteOne', 'deleteMany'], function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const commentIds = this.getQuery();
        if (!commentIds)
            next();
        const comments = yield exports.Comment.find(commentIds);
        for (let comment of comments) {
            yield this.model.deleteMany({ _id: { $in: comment.replyIds } });
            // delete replyId from the comment of the reply 
            yield this.model.updateOne({ replyIds: comment._id }, { $pull: { replyIds: comment._id } });
        }
        next();
    });
});
exports.Comment = mongoose_1.default.model('Comment', exports.commentSchema);
