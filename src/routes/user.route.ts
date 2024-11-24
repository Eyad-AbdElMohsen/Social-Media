import { Router } from 'express';
import { signUpValidation, loginValidation } from "../validators/user.validator";
import validationMiddleware from '../middlewares/validation.middleware';
import * as userController from '../controllers/user.controller';
import { allowedTo } from '../middlewares/allowedTo';
import { Role } from '../utils/userRole';
import { pagination } from '../middlewares/pagination.middleware';
import { verifyToken } from '../middlewares/verifyToken';
import { isValidUser, isValidEmail } from '../middlewares/isValid';
import  getMyUser  from '../middlewares/getMe'

const userRouter = Router()

userRouter.route('/signup')
            .post(signUpValidation, validationMiddleware, userController.postSignUp)


userRouter.route('/login')
            .post(loginValidation, validationMiddleware, isValidEmail, userController.postLogin)

//getting all users for admin 
userRouter.route('/users')
            .get(verifyToken, allowedTo([Role.ADMIN]), pagination, userController.getAllUsers)

            
userRouter.route('/users/me/posts')
            .get(verifyToken, pagination, userController.getMyPosts)

userRouter.route('/users/:userId/posts')
            .get(verifyToken, isValidUser, pagination, userController.getUserPosts)

userRouter.route('/users/me/friends')
            .get(verifyToken, getMyUser, pagination, userController.getMyFriends)

userRouter.route('/users/:userId/friends')
            .get(verifyToken, isValidUser, pagination, userController.getUserFriends)




export default userRouter