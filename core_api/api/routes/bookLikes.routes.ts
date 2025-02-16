// bookLikes.routes.ts (Routes)
import { Router } from 'express';
import {
  addBookLikeController,
  getBookLikesController,
  getUserLikesController,
  removeBookLikeController,
  getBookLikeStatusController
} from '../controllers/bookLikes.controller';
import { authenticateUser } from '../middleware/auth';

const router = Router();

// All routes require basic authentication
router.post('/:bookId/add', authenticateUser, addBookLikeController);
router.delete('/:bookId/remove', authenticateUser, removeBookLikeController);
router.get('/:bookId/status', authenticateUser, getBookLikeStatusController);
router.get('/user', authenticateUser, getUserLikesController);
router.get('/:bookId', authenticateUser, getBookLikesController); // Admin check happens in DB layer

export default router;