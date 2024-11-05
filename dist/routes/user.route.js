"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_validator_1 = require("../validators/user.validator");
const validation_middleware_1 = __importDefault(require("../middlewares/validation.middleware"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = (0, express_1.Router)();
userRouter.route('/login')
    .post(user_validator_1.loginValidation, validation_middleware_1.default, user_controller_1.postLogin);
userRouter.route('/signup')
    .post(user_validator_1.signUpValidation, validation_middleware_1.default, user_controller_1.postSignUp);
//getting all users for admin 
userRouter.route('/')
    .get();
exports.default = userRouter;
