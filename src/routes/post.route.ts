import { Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken';
import * as postController from '../controllers/post.controller';
import { upload } from '../utils/multer';
import { allowedTo } from '../middlewares/allowedTo';
import { Role } from '../utils/userRole';
import { pagination } from '../middlewares/pagination.middleware';
import { isCommentOwner, isPostOwner } from '../middlewares/isOwner';
import { isValidComment, isValidPost } from '../middlewares/isValid';

const postRouter = Router()
            

postRouter.route('/posts')
.get(verifyToken, allowedTo([Role.ADMIN]), pagination, postController.getAllPosts)
.post(verifyToken, upload.single('image'), postController.addPost)

// to delete, edit and get a post (or a share)
postRouter.route('/posts/:postId')
            .get(verifyToken, isValidPost, postController.getPost)
            .patch(verifyToken, isValidPost, isPostOwner, upload.single('image'), postController.editPost)
            .delete(verifyToken, isValidPost, isPostOwner, postController.deletePost)

postRouter.route('/posts/:postId/likes')
            .get(verifyToken, isValidPost, postController.getPostLikes)
            .post(verifyToken, isValidPost, postController.likePost)
            .delete(verifyToken, isValidPost, postController.removeLike)

postRouter.route('/posts/:postId/comments')
            .get(verifyToken, isValidPost, postController.getPostComments)
            .post(verifyToken, isValidPost, upload.single('image'), postController.addPostComment)
            
// to delete, edit and get a comment (or a reply)
postRouter.route('/posts/:postId/comments/:commentId')
            .get(verifyToken, isValidPost, postController.getPostComment)
            .patch(verifyToken, isValidPost, isValidComment, isCommentOwner, upload.single('image'), postController.editPostComment)
            .delete(verifyToken, isValidPost, isValidComment, isCommentOwner, postController.deletePostComment)

postRouter.route('/posts/:postId/comments/:commentId/replies')
            .get(verifyToken, isValidPost, isValidComment, postController.getCommentReplies)
            .post(verifyToken, isValidPost, isValidComment, upload.single('image'), postController.addCommentReply)

postRouter.route('/posts/:postId/shares')
            .get(verifyToken, isValidPost, postController.getPostShares)
            .post(verifyToken, isValidPost, upload.single('image'), postController.addPostShare)




export default postRouter