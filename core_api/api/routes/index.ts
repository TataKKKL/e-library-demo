import { Router } from 'express';
import helloRoutes from './hello.routes';
import bookRoutes from './book.routes';

const router = Router();
router.use('/hello', helloRoutes);
router.use('/books', bookRoutes);
export default router;