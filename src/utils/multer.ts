import multer from "multer";
import { Request } from "express";
import path from 'path'
import ApiError from "../errors/api.error";

const diskStorage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        cb(null, path.join(__dirname, '../../uploads'))
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const extintion = file.mimetype.split('/')[1]
        cb(null, `${fileName}.${extintion}`)
    }
})

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const type = file.mimetype.split('/')[0];
    if (type !== 'image') {
        return cb(new ApiError('File should be an image', 401));
    }
    cb(null, true);
};

export const upload = multer({
    storage: diskStorage,
    fileFilter
});