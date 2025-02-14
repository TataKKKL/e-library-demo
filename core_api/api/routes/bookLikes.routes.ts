// bookLikes.routes.ts (Routes)
import { Router } from 'express';
import {
  toggleBookLikeController,
  getBookLikesController,
  getUserLikesController
} from '../controllers/bookLikes.controller';
import { authenticateUser } from '../middleware/auth'; // Assuming you have auth middleware

const router = Router();

// Toggle like for a book (requires authentication)
router.post('/:bookId', authenticateUser, toggleBookLikeController);

// Get all likes for a specific book
router.get('/book/:bookId', getBookLikesController);

// Get all books liked by the authenticated user
router.get('/user', authenticateUser, getUserLikesController);

export default router;