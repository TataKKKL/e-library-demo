// routes/profiles.routes.ts
import { Router } from 'express';
import { getAllProfilesController } from '../controllers/profiles.controller';
import { authenticateAdmin} from '../middleware/auth';

const router = Router();

router.get('/', authenticateAdmin, getAllProfilesController);

export default router;
