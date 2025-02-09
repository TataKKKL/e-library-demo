import { Router } from 'express';
import { getBooksController, getBookByTitleController } from '../controllers/books.controller';

const router = Router();

// Keep existing route and add new route
router.get('/', getBooksController);
router.get('/:title', getBookByTitleController);

export default router;