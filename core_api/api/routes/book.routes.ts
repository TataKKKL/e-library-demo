import { Router } from 'express';
import {
  getBooksController,
  getBookByIdController,
  createBookController,
  updateBookController,
  deleteBookController
} from '../controllers/books.controller';

const router = Router();

router.get('/', getBooksController);
router.get('/:id', getBookByIdController);
router.post('/', createBookController);
router.put('/:id', updateBookController);
router.delete('/:id', deleteBookController);

export default router;