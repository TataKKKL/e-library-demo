import { Router } from 'express';
import helloRoutes from './hello.routes';
import bookRoutes from './book.routes';
import bookLikesRoutes from './bookLikes.routes';

const router = Router();
router.use('/hello', helloRoutes);
router.use('/books', bookRoutes);
router.use('/book-likes', bookLikesRoutes);

export default router;