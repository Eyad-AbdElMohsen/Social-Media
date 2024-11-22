import { Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken';
import * as postController from '../controllers/post.controller';
import { upload } from '../utils/multer';
import { allowedTo } from '../middlewares/allowedTo';
import { Role } from '../utils/userRole';
import { pagination } from '../middlewares/pagination.middleware';
import { isCommentOwner, isPostOwner } from '../middlewares/isOwner';

const postRouter = Router()
            

postRouter.route('/posts/:postId')
            .get(verifyToken, postController.getPost)
            .patch(verifyToken, isPostOwner, upload.single('image'), postController.editPost)
            .delete(verifyToken, isPostOwner, postController.deletePost)

postRouter.route('/posts')
            .get(verifyToken, allowedTo([Role.ADMIN]), pagination, postController.getAllPosts)
            .post(verifyToken, upload.single('image'), postController.addPost)

postRouter.route('/posts/:postId/likes')
            .get(verifyToken, postController.getPostLikes)
            .post(verifyToken, postController.likePost)
            .delete(verifyToken, postController.removeLike)

postRouter.route('/posts/:postId/comments')
            .get(verifyToken, postController.getPostComments)
            .post(verifyToken, upload.single('image'), postController.addPostComment)
            
// to delete, edit and get a comment (or a reply)
postRouter.route('/posts/:postId/comments/:commentId')
            .get(verifyToken, postController.getPostComment)
            .patch(verifyToken, isCommentOwner, upload.single('image'), postController.editPostComment)
            .delete(verifyToken, isCommentOwner, postController.deletePostComment)

postRouter.route('/posts/:postId/comments/:commentId/replies')
            .get(verifyToken, postController.getCommentReplies)
            .post(verifyToken, upload.single('image'), postController.addCommentReply)




export default postRouter