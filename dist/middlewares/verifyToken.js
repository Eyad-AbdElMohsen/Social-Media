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
exports.verifyToken = void 0;
const asyncWrapper_middleware_1 = __importDefault(require("./asyncWrapper.middleware"));
const api_error_1 = __importDefault(require("../errors/api.error"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJWT_1 = require("../utils/generateJWT");
dotenv_1.default.config();
// this middleware extracts a token from the ( Authorization header ), verifies it, and attaches the user to ( req.currentUser )
exports.verifyToken = (0, asyncWrapper_middleware_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        throw new api_error_1.default('token is required', 401, 'verifyToken.file');
    const token = authHeader.split(' ')[1];
    if (!generateJWT_1.secretKey)
        throw new api_error_1.default('internal server error', 500);
    const user = jsonwebtoken_1.default.verify(token, generateJWT_1.secretKey);
    req.currentUser = user;
    next();
}));
