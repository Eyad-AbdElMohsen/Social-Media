import { Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken';
import * as postController from '../controllers/post.controller';
import { upload } from '../utils/multer';
import { allowedTo } from '../middlewares/allowedTo';
import { Role } from '../utils/userRole';
import { pagination } from '../middlewares/pagination.middleware';
import { isPostOwner } from '../middlewares/isPostOwner';

const postRouter = Router()
            

postRouter.route('/posts/:postId')
            .get(verifyToken, postController.getPost)
            .patch(verifyToken, isPostOwner, upload.single('image'), postController.editPost)
            .delete(verifyToken, isPostOwner, postController.deletePost)

postRouter.route('/posts')
            .get(verifyToken, allowedTo([Role.ADMIN]), pagination, postController.getAllPosts)
            .post(verifyToken, upload.single('image'), postController.addPost)

postRouter.route('/posts/likes/:postId')
            .get(verifyToken, postController.getPostLikes)
            .post(verifyToken, postController.likePost)
            .delete(verifyToken, postController.removeLike)

export default postRouter