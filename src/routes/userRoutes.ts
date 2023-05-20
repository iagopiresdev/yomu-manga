import { Router } from 'express';
import * as UserController from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware'; // Your authentication middleware

const router = Router();

// Registration and Login routes
router.post('/register', UserController.register);
router.post('/login', UserController.login);

// Routes for authenticated users only
router.get('/profile', authMiddleware, UserController.getProfile); // Get logged-in user's profile
router.get('/', authMiddleware, UserController.getAll); // Get all users
router.put('/:id', authMiddleware, UserController.update); // Update a user
router.delete('/:id', authMiddleware, UserController.remove); // Delete a user

export default router;
