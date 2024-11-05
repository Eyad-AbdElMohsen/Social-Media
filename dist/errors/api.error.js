"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(message, code, path, data) {
        super(message);
        this.message = message;
        this.code = code;
        this.path = path;
        this.data = data;
    }
}
exports.default = ApiError;
