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
exports.deleteFriend = exports.refuseNewFriend = exports.acceptNewFriend = exports.cancelAddFriend = exports.addNewFriend = exports.getMySentRequistsList = exports.getMyReceivedRequistsList = void 0;
const asyncWrapper_middleware_1 = __importDefault(require("../middlewares/asyncWrapper.middleware"));
const httpStatusText_1 = require("../utils/httpStatusText");
const friendServices = __importStar(require("../services/friends.service"));
exports.getMyReceivedRequistsList = (0, asyncWrapper_middleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield friendServices.getMyReceivedRequistsList(req.me);
    res.status(200).json({
        status: httpStatusText_1.SUCCESS,
        data: { list }
    });
}));
exports.getMySentRequistsList = (0, asyncWrapper_middleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield friendServices.getMySentRequistsList(req.me);
    res.status(200).json({
        status: httpStatusText_1.SUCCESS,
        data: { list }
    });
}));
exports.addNewFriend = (0, asyncWrapper_middleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield friendServices.addNewFriend(req.me, req.user);
    res.status(200).json({ status: httpStatusText_1.SUCCESS });
}));
exports.cancelAddFriend = (0, asyncWrapper_middleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield friendServices.cancelAddFriend(req.me, req.user);
    res.status(200).json({ status: httpStatusText_1.SUCCESS });
}));
exports.acceptNewFriend = (0, asyncWrapper_middleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const friends = [req.me, req.user];
    yield friendServices.acceptNewFriend(req.me, req.user);
    res.status(200).json({ status: httpStatusText_1.SUCCESS, data: { friends } });
}));
exports.refuseNewFriend = (0, asyncWrapper_middleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield friendServices.refuseNewFriend(req.me, req.user);
    res.status(200).json({ status: httpStatusText_1.SUCCESS });
}));
exports.deleteFriend = (0, asyncWrapper_middleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield friendServices.deleteFriend(req.me, req.user);
    res.status(200).json({ status: httpStatusText_1.SUCCESS });
}));
