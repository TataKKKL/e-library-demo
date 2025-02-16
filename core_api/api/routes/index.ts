import { Router } from 'express';
import helloRoutes from './hello.routes';
import bookRoutes from './book.routes';
import bookLikesRoutes from './bookLikes.routes';
import profilesRoutes from './profiles.routes';

const router = Router();
router.use('/hello', helloRoutes);
router.use('/books', bookRoutes);
router.use('/book-likes', bookLikesRoutes);
router.use('/profiles', profilesRoutes);

export default router;