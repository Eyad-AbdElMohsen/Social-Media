import { Router } from 'express';
import { signUpValidation, loginValidation } from "../validators/user.validator";
import validationMiddleware from '../middlewares/validation.middleware';
import * as userController from '../controllers/user.controller';
import { allowedTo } from '../middlewares/allowedTo';
import { Role } from '../utils/userRole';
import { pagination } from '../middlewares/pagination.middleware';
import { verifyToken } from '../middlewares/verifyToken';
import { isValidUser } from '../middlewares/isValid';

const userRouter = Router()

userRouter.route('/signup')
            .post(signUpValidation, validationMiddleware, userController.postSignUp)


userRouter.route('/login')
            .post(loginValidation, validationMiddleware, isValidUser, userController.postLogin)

//getting all users for admin 
userRouter.route('/users')
            .get(verifyToken, allowedTo([Role.ADMIN]), pagination, userController.getAllUsers)

            
userRouter.route('/users/me/posts')
            .get(verifyToken, pagination, userController.getMyPosts)

userRouter.route('/users/:userId/posts')
            .get(verifyToken, pagination, userController.getUserPosts)



export default userRouter