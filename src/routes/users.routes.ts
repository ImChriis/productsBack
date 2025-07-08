import { Router } from 'express';
import { addUser, getUser, updateUser } from '../controllers/users.controller';

const router = Router();

router.get('/', getUser);
router.post('/add', addUser);
router.put('/update/:id', updateUser);


export default router;