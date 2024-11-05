"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncWrapper = (asyncFn) => {
    return (req, res, next) => {
        asyncFn(req, res, next).catch((err) => {
            next(err);
        });
    };
};
exports.default = asyncWrapper;
