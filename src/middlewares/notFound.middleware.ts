import { Request, Response, NextFunction } from 'express';
import ApiError from '../errors/api.error';

const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
    next(new ApiError('This resourse is not available', 404, req.path))
}

export default notFoundMiddleware