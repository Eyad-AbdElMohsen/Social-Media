import { Request, Response, NextFunction } from 'express';

export const pagination = (req: Request, res: Response, next: NextFunction) =>{
    const limit: number = parseInt(String(req.query.limit)) || 10;
    const page: number = parseInt(String(req.query.page)) || 1;
    const skip: number = (page - 1) * limit
    req.query.limit = limit.toString();
    req.query.skip = skip.toString();
    next()
}
