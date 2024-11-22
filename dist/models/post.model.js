"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const api_error_1 = __importDefault(require("../errors/api.error"));
dotenv_1.default.config();
const DB_URL = process.env.DB_URL;
if (typeof DB_URL == 'string')
    mongoose_1.default.connect(DB_URL).then(() => console.log('mongodb server start'));
else
    throw ("DB_URL must be a satring");
const postSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    content: {
        image: { type: String, required: false },
        text: { type: String, required: false },
    },
    likes: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }]
}, {
    timestamps: true
});
postSchema.pre('save', function (next) {
    if (!this.content.text && !this.content.image) {
        throw new api_error_1.default('user should add message or image or both', 400);
    }
    next();
});
exports.Post = mongoose_1.default.model('Post', postSchema);
