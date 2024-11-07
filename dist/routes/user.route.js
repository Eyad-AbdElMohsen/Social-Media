"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_validator_1 = require("../validators/user.validator");
const validation_middleware_1 = __importDefault(require("../middlewares/validation.middleware"));
const user_controller_1 = require("../controllers/user.controller");
const allowedTo_1 = require("../middlewares/allowedTo");
const userRole_1 = require("../utils/userRole");
const pagination_middleware_1 = require("../middlewares/pagination.middleware");
const verifyToken_1 = require("../middlewares/verifyToken");
const userRouter = (0, express_1.Router)();
userRouter.route('/signup')
    .post(user_validator_1.signUpValidation, validation_middleware_1.default, user_controller_1.postSignUp);
userRouter.route('/login')
    .post(user_validator_1.loginValidation, validation_middleware_1.default, user_controller_1.postLogin);
//getting all users for admin 
userRouter.route('/users')
    .get(verifyToken_1.verifyToken, (0, allowedTo_1.allowedTo)([userRole_1.Role.ADMIN]), pagination_middleware_1.pagination, user_controller_1.getAllUsers);
exports.default = userRouter;
