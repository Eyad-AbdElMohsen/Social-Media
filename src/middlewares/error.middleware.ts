import { Request, Response, NextFunction } from "express";
import ApiError from "../errors/api.error";
import { stat } from "fs";

const errorMiddleware = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    let message = "Internal server error", code = 500, path, data
    if(err instanceof ApiError){
        message = err.message
        code = err.code
        path = err.path
        data = err.data
    }else if (err instanceof Error){
        message = err.message
    }else if(typeof err == "string"){
        message = err
    }
    res.status(code).json({
        status: 'Error',
        message: message,
        path: path,
        data: data
    })
}


export default errorMiddleware