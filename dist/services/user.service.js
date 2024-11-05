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
exports.correctPassword = exports.postSignup = exports.getUser = void 0;
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const getUser = (email) => {
    const user = user_model_1.User.findOne({ email });
    return user;
};
exports.getUser = getUser;
const postSignup = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(data.password, 10);
    const newUser = new user_model_1.User(Object.assign(Object.assign({}, data), { password: hashedPassword, confirmPassword: hashedPassword }));
    yield newUser.save();
    return newUser;
});
exports.postSignup = postSignup;
const correctPassword = (password, user) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.compare(password, user.password);
});
exports.correctPassword = correctPassword;
