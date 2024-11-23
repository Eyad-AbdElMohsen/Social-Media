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
exports.addPostShare = exports.getPostShares = void 0;
const post_model_1 = require("../models/post.model");
const getPostShares = (post) => __awaiter(void 0, void 0, void 0, function* () {
    const shares = yield post.populate('shareIds', { '__v': false });
    return shares;
});
exports.getPostShares = getPostShares;
const addPostShare = (post, data) => __awaiter(void 0, void 0, void 0, function* () {
    const newShare = new post_model_1.Post({
        userId: data.userId,
        content: {
            text: data.text,
            image: data.fileName
        },
        originalPost: data.originalPost,
    });
    yield newShare.populate('userId', { "__v": false, "password": false, "confirmPassword": false });
    yield newShare.save();
    post.shareIds.push(newShare._id);
    yield post.save();
    return newShare;
});
exports.addPostShare = addPostShare;
