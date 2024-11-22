"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowedTo = void 0;
const api_error_1 = __importDefault(require("../errors/api.error"));
const allowedTo = (roles) => {
    return (req, res, next) => {
        if (roles.includes(req.currentUser.role))
            next();
        else
            throw new api_error_1.default('You are not allowed to this action', 401);
    };
};
exports.allowedTo = allowedTo;
