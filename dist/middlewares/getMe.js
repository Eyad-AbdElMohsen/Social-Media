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
const asyncWrapper_middleware_1 = __importDefault(require("./asyncWrapper.middleware"));
const user_service_1 = require("../services/user.service");
const getMyUser = (0, asyncWrapper_middleware_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const me = yield (0, user_service_1.getMe)(req.currentUser.id);
    req.me = me;
    next();
}));
exports.default = getMyUser;
