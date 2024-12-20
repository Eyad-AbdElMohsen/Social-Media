"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.signUpValidation = void 0;
const express_validator_1 = require("express-validator");
const api_error_1 = __importDefault(require("../errors/api.error"));
exports.signUpValidation = [
    (0, express_validator_1.body)('name')
        .matches(/^[A-Za-z\s]+$/).withMessage("Name can only contain letters and spaces"),
    (0, express_validator_1.body)('email')
        .isEmail()
        .withMessage('field must be valid email'),
    (0, express_validator_1.body)('password')
        .isLength({ min: 8, max: 64 }).withMessage("Password must be between 8 and 64 characters long")
        .matches(/(?=.*\d)/).withMessage("Password must contain at least one number")
        .matches(/(?=.*[a-z])/).withMessage("Password must contain at least one lowercase letter")
        .matches(/(?=.*[A-Z])/).withMessage("Password must contain at least one uppercase letter"),
    (0, express_validator_1.body)("confirmPassword", "Confirm your password")
        .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new api_error_1.default("Passwords do not match", 400);
        }
        else
            return true;
    }),
];
exports.loginValidation = [
    (0, express_validator_1.body)('email')
        .isEmail()
        .withMessage('field must be valid email'),
    (0, express_validator_1.body)('password')
        .isLength({ min: 8, max: 64 }).withMessage("Password must be between 8 and 64 characters long")
        .matches(/(?=.*\d)/).withMessage("Password must contain at least one number")
        .matches(/(?=.*[a-z])/).withMessage("Password must contain at least one lowercase letter")
        .matches(/(?=.*[A-Z])/).withMessage("Password must contain at least one uppercase letter"),
];
