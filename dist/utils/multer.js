"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const api_error_1 = __importDefault(require("../errors/api.error"));
const diskStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__dirname, '../../uploads'));
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const extintion = file.mimetype.split('/')[1];
        cb(null, `${fileName}.${extintion}`);
    }
});
const fileFilter = (req, file, cb) => {
    const type = file.mimetype.split('/')[0];
    if (type !== 'image') {
        return cb(new api_error_1.default('File should be an image', 401));
    }
    cb(null, true);
};
exports.upload = (0, multer_1.default)({
    storage: diskStorage,
    fileFilter
});
