import { Router } from 'express';
import helloRoutes from './hello.routes';

const router = Router();
router.use('/hello', helloRoutes);

export default router;