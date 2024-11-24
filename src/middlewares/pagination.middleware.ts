import { Request, Response, NextFunction } from 'express';

export const pagination = (req: Request, res: Response, next: NextFunction) =>{
    const limit = parseInt(String(req.query.limit)) || 10;
    const page = parseInt(String(req.query.page)) || 1;
    const skip = (page - 1) * limit
    req.query.limit = limit.toString();
    req.query.skip = skip.toString();
    next()
}
