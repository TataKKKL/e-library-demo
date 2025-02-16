// bookLikes.routes.ts (Routes)
import { Router } from 'express';
import {
  toggleBookLikeController,
  getBookLikesController,
  getUserLikesController,
  removeBookLikeController
} from '../controllers/bookLikes.controller';
import { authenticateUser } from '../middleware/auth';

const router = Router();

// All routes require basic authentication
router.post('/:bookId/toggle', authenticateUser, toggleBookLikeController);
router.delete('/:bookId/remove', authenticateUser, removeBookLikeController);
router.get('/user', authenticateUser, getUserLikesController);
router.get('/:bookId', authenticateUser, getBookLikesController); // Admin check happens in DB layer

export default router;