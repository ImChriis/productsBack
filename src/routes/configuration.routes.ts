import { Router } from 'express';
import { getConfig, updateConfig } from '../controllers/configuration.controller';

const router = Router();

router.get('/', getConfig);
router.put('/update/:id', updateConfig);

export default router;
