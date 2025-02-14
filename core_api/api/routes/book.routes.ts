// book.routes.ts (Routes)
import { Router } from 'express';
import {
  getBooksController,
  getBookByTitleController,
  createBookController,
  updateBookController,
  deleteBookController
} from '../controllers/books.controller';

const router = Router();

router.get('/', getBooksController);
router.get('/:title', getBookByTitleController);
router.post('/', createBookController);
router.put('/:title', updateBookController);
router.delete('/:title', deleteBookController);

export default router;