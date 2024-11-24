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
exports.getUserFriends = exports.getMyFriends = exports.getMyPosts = exports.getUserPosts = exports.getAllUsers = exports.postLogin = exports.postSignUp = void 0;
const api_error_1 = __importDefault(require("../errors/api.error"));
const asyncWrapper_middleware_1 = __importDefault(require("../middlewares/asyncWrapper.middleware"));
const httpStatusText_1 = require("../utils/httpStatusText");
const mongoose_1 = require("mongoose");
const userServices = __importStar(require("../services/user.service"));
const postServices = __importStar(require("../services/post.service"));
const friendServices = __importStar(require("../services/friends.service"));
exports.postSignUp = (0, asyncWrapper_middleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userServices.getUserByEmail(req.body.email);
    if (user)
        throw new api_error_1.default('This email is already exists', 409, req.path, user);
    const newUser = yield userServices.postSignup(req.body);
    res.status(200).json({
        status: httpStatusText_1.SUCCESS,
        data: { newUser }
    });
}));
exports.postLogin = (0, asyncWrapper_middleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const correctPass = yield userServices.correctPassword(req.body.password, user);
    if (!correctPass)
        throw new api_error_1.default("Password isn't correct", 400, req.path);
    const token = yield userServices.login(user);
    res.status(200).json({
        status: httpStatusText_1.SUCCESS,
        data: {
            email: user.email,
            Name: user.name,
            role: user.role,
            token: token
        }
    });
}));
exports.getAllUsers = (0, asyncWrapper_middleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = Number(req.query.limit);
    const skip = Number(req.query.skip);
    const users = yield userServices.getAllUsers(limit, skip);
    res.status(200).json({
        status: httpStatusText_1.SUCCESS,
        data: { users }
    });
}));
const ObjectId = mongoose_1.Types.ObjectId;
exports.getUserPosts = (0, asyncWrapper_middleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = Number(req.query.limit);
    const skip = Number(req.query.skip);
    const posts = yield postServices.getUserPosts(limit, skip, new ObjectId(req.params.userId));
    res.status(200).json({
        status: httpStatusText_1.SUCCESS,
        data: { posts }
    });
}));
exports.getMyPosts = (0, asyncWrapper_middleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = Number(req.query.limit);
    const skip = Number(req.query.skip);
    const posts = yield postServices.getUserPosts(limit, skip, req.currentUser.id);
    res.status(200).json({
        status: httpStatusText_1.SUCCESS,
        data: { posts }
    });
}));
exports.getMyFriends = (0, asyncWrapper_middleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = Number(req.query.limit);
    const skip = Number(req.query.skip);
    const friends = yield friendServices.getUserFriends(limit, skip, req.me);
    res.status(200).json({
        status: httpStatusText_1.SUCCESS,
        data: { friends }
    });
}));
exports.getUserFriends = (0, asyncWrapper_middleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = Number(req.query.limit);
    const skip = Number(req.query.skip);
    const friends = yield friendServices.getUserFriends(limit, skip, req.user);
    res.status(200).json({
        status: httpStatusText_1.SUCCESS,
        data: { friends }
    });
}));
