import { Router } from 'express';
import { signUpValidation, loginValidation } from "../validators/user.validator";
import validationMiddleware from '../middlewares/validation.middleware';
import { postSignUp, postLogin } from '../controllers/user.controller';
const userRouter = Router()

userRouter.route('/login')
            .post(loginValidation, validationMiddleware, postLogin)

userRouter.route('/signup')
            .post(signUpValidation, validationMiddleware, postSignUp)

//getting all users for admin 
userRouter.route('/')
            .get()


export default userRouter