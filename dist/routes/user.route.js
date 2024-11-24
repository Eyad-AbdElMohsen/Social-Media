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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_validator_1 = require("../validators/user.validator");
const validation_middleware_1 = __importDefault(require("../middlewares/validation.middleware"));
const userController = __importStar(require("../controllers/user.controller"));
const allowedTo_1 = require("../middlewares/allowedTo");
const userRole_1 = require("../utils/userRole");
const pagination_middleware_1 = require("../middlewares/pagination.middleware");
const verifyToken_1 = require("../middlewares/verifyToken");
const isValid_1 = require("../middlewares/isValid");
const getMe_1 = __importDefault(require("../middlewares/getMe"));
const isIFrend_1 = require("../middlewares/isIFrend");
const userRouter = (0, express_1.Router)();
userRouter.route('/signup')
    .post(user_validator_1.signUpValidation, validation_middleware_1.default, userController.postSignUp);
userRouter.route('/login')
    .post(user_validator_1.loginValidation, validation_middleware_1.default, isValid_1.isValidEmail, userController.postLogin);
//getting all users for admin 
userRouter.route('/users')
    .get(verifyToken_1.verifyToken, (0, allowedTo_1.allowedTo)([userRole_1.Role.ADMIN]), pagination_middleware_1.pagination, userController.getAllUsers);
userRouter.route('/users/me/posts')
    .get(verifyToken_1.verifyToken, pagination_middleware_1.pagination, userController.getMyPosts);
userRouter.route('/users/:userId/posts')
    .get(verifyToken_1.verifyToken, isValid_1.isValidUser, isIFrend_1.isIFriendOfUser, pagination_middleware_1.pagination, userController.getUserPosts);
userRouter.route('/users/me/friends')
    .get(verifyToken_1.verifyToken, getMe_1.default, pagination_middleware_1.pagination, userController.getMyFriends);
userRouter.route('/users/:userId/friends')
    .get(verifyToken_1.verifyToken, isValid_1.isValidUser, isIFrend_1.isIFriendOfUser, pagination_middleware_1.pagination, userController.getUserFriends);
exports.default = userRouter;
