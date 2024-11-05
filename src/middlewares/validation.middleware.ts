import { NextFunction, Request, Response } from "express";
import asyncWrapper from "./asyncWrapper.middleware";
import { validationResult } from "express-validator";
import ApiError from "../errors/api.error";

const validationMiddleware = asyncWrapper(async(req: Request, res: Response, next: NextFunction) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        throw new ApiError('Validation Error', 400, req.path, errors.array())
    }
    next()
})

export default validationMiddleware