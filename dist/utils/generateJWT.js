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
exports.generateJWT = exports.secretKey = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.secretKey = process.env.JWT_SECRET;
const generateJWT = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (exports.secretKey) {
        const token = jsonwebtoken_1.default.sign(payload, 
        // in terminal -> require('crypto').randomBytes(32).toString('hex') 
        exports.secretKey, { expiresIn: '5h' });
        return token;
    }
    else {
        throw new Error('the secretKey is required');
    }
});
exports.generateJWT = generateJWT;
