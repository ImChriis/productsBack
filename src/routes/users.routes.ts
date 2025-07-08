import { Router } from 'express';
import { addUser, getUser } from '../controllers/users.controller';

const router = Router();

router.get('/', getUser);
router.post('/add', addUser);

export default router;