import { Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken';
import { pagination } from '../middlewares/pagination.middleware';
import * as friendControllers from '../controllers/friend.controller';
import getMyUser from '../middlewares/getMe';
import { isValidUser } from '../middlewares/isValid';


const friendRouter = Router()


friendRouter.route('/friends/recieve-requests')
                .get(verifyToken, getMyUser, pagination, friendControllers.getMyReceivedRequistsList)
                
friendRouter.route('/friends/sent-requests')
                .get(verifyToken, getMyUser, pagination, friendControllers.getMySentRequistsList)

friendRouter.route('/friends/add-cancel/users/:userId')
                .post(verifyToken, getMyUser, isValidUser, friendControllers.addNewFriend)
                .delete(verifyToken, getMyUser, isValidUser, friendControllers.cancelAddFriend)

friendRouter.route('/friends/accept-refuse/users/:userId')
                .post(verifyToken, getMyUser, isValidUser, friendControllers.acceptNewFriend)
                .delete(verifyToken, getMyUser, isValidUser, friendControllers.refuseNewFriend)

friendRouter.route('/friends/delete/users/:userId')
                .delete(verifyToken, getMyUser, isValidUser, friendControllers.deleteFriend)

export default friendRouter