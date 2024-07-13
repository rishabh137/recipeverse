import express from 'express'
import { registerUser, authUser, getUserById, logout, getCurrentUser } from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/user', protect, getCurrentUser);
router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/:id', protect, getUserById)
router.post('/logout', logout)

export default router;
