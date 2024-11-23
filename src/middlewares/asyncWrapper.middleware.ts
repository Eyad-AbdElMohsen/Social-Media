import { Request, Response, NextFunction } from 'express';

type asyncFn<R> = (req: Request, res: Response, next: NextFunction) => Promise<R> 

const asyncWrapper = <R>(asyncFn: asyncFn<R>) => {
    return ( req: Request, res: Response, next: NextFunction) => {
        asyncFn(req, res, next).catch((err) => {
            next(err)
        })
    }
}

export default asyncWrapper