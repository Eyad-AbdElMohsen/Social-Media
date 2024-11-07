"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagination = void 0;
const pagination = (req, res, next) => {
    const limit = parseInt(String(req.query.limit)) || 10;
    const page = parseInt(String(req.query.page)) || 1;
    const skip = (page - 1) * limit;
    req.query.limit = limit.toString();
    req.query.skip = skip.toString();
    next();
};
exports.pagination = pagination;
