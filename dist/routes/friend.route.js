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
const verifyToken_1 = require("../middlewares/verifyToken");
const pagination_middleware_1 = require("../middlewares/pagination.middleware");
const friendControllers = __importStar(require("../controllers/friend.controller"));
const getMe_1 = __importDefault(require("../middlewares/getMe"));
const isValid_1 = require("../middlewares/isValid");
const friendRouter = (0, express_1.Router)();
friendRouter.route('/friends/recieve-requests')
    .get(verifyToken_1.verifyToken, getMe_1.default, pagination_middleware_1.pagination, friendControllers.getMyReceivedRequistsList);
friendRouter.route('/friends/sent-requests')
    .get(verifyToken_1.verifyToken, getMe_1.default, pagination_middleware_1.pagination, friendControllers.getMySentRequistsList);
friendRouter.route('/friends/add-cancel/users/:userId')
    .post(verifyToken_1.verifyToken, getMe_1.default, isValid_1.isValidUser, friendControllers.addNewFriend)
    .delete(verifyToken_1.verifyToken, getMe_1.default, isValid_1.isValidUser, friendControllers.cancelAddFriend);
friendRouter.route('/friends/accept-refuse/users/:userId')
    .post(verifyToken_1.verifyToken, getMe_1.default, isValid_1.isValidUser, friendControllers.acceptNewFriend)
    .delete(verifyToken_1.verifyToken, getMe_1.default, isValid_1.isValidUser, friendControllers.refuseNewFriend);
friendRouter.route('/friends/delete/users/:userId')
    .delete(verifyToken_1.verifyToken, getMe_1.default, isValid_1.isValidUser, friendControllers.deleteFriend);
exports.default = friendRouter;
