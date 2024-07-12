import express from 'express'
import { registerUser, authUser, getUserById } from '../controllers/userController.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/:id', getUserById)

export default router;
