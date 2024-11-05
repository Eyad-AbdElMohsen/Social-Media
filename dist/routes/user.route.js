"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter = (0, express_1.Router)();
userRouter.route('/login')
    .post();
userRouter.route('/signup')
    .post();
//getting all users for admin 
userRouter.route('/')
    .get();
exports.default = userRouter;
