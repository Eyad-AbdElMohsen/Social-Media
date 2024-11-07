import { Router } from 'express';
import { signUpValidation, loginValidation } from "../validators/user.validator";
import validationMiddleware from '../middlewares/validation.middleware';
import { postSignUp, postLogin, getAllUsers } from '../controllers/user.controller';
import { allowedTo } from '../middlewares/allowedTo';
import { Role } from '../utils/userRole';
import { pagination } from '../middlewares/pagination.middleware';
import { verifyToken } from '../middlewares/verifyToken';
const userRouter = Router()

userRouter.route('/signup')
            .post(signUpValidation, validationMiddleware, postSignUp)


userRouter.route('/login')
            .post(loginValidation, validationMiddleware, postLogin)

//getting all users for admin 
userRouter.route('/users')
            .get(verifyToken, allowedTo([Role.ADMIN]), pagination, getAllUsers)


export default userRouter