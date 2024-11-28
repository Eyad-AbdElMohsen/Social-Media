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
exports.Post = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const api_error_1 = __importDefault(require("../errors/api.error"));
dotenv_1.default.config();
const DB_URL = process.env.DB_URL;
if (typeof DB_URL == 'string')
    mongoose_1.default.connect(DB_URL).then(() => console.log('mongodb server start'));
else
    throw ("DB_URL must be a satring");
const postSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true },
    originalPost: { type: mongoose_1.Types.ObjectId },
    content: {
        image: { type: String, required: false },
        text: { type: String, required: false },
    },
    likesUserId: [{ type: mongoose_1.Types.ObjectId, ref: 'User' }],
    commentIds: [{ type: mongoose_1.Types.ObjectId, ref: 'Comment' }],
    shareIds: [{ type: mongoose_1.Types.ObjectId, ref: 'Post' }],
}, {
    timestamps: true
});
postSchema.pre('save', function (next) {
    if (!this.content.text && !this.content.image) {
        throw new api_error_1.default('user should add message or image or both', 400);
    }
    next();
});
// deleting all comments and share that refer to the post which is deleted
postSchema.pre(['deleteOne', 'deleteMany'], function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const postId = this.getQuery()['_id'];
        const post = yield exports.Post.findOne({ _id: postId });
        if (post.commentIds.length != 0)
            yield mongoose_1.default.model('Comment').deleteMany({ _id: { $in: post.commentIds } });
        if (post.shareIds.length != 0) {
            yield mongoose_1.default.model('Post').deleteMany({ _id: { $in: post.shareIds } });
        }
        // delete the shareId of the deleted post from the parent post
        yield mongoose_1.default.model('Post').updateOne({ shareIds: post._id }, { $pull: { shareIds: post._id } });
        next();
    });
});
exports.Post = mongoose_1.default.model('Post', postSchema);
