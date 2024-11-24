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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIFriendOfUser = void 0;
const asyncWrapper_middleware_1 = __importDefault(require("./asyncWrapper.middleware"));
const api_error_1 = __importDefault(require("../errors/api.error"));
exports.isIFriendOfUser = (0, asyncWrapper_middleware_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const me = req.me;
    const user = req.user;
    console.log(me, user);
    const isFriends = me.friendIds.some(id => id.toString() == user._id.toString());
    if (!isFriends)
        throw new api_error_1.default('You are not friend of this user', 400);
    next();
}));
