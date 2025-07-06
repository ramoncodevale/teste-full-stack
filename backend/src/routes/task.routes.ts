import { Router } from 'express';
import { createTask, getAllTasks, updateTask, deleteTask } from '../controllers/task.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.get('/tasks', authenticateToken, getAllTasks);
router.post('/tasks', authenticateToken, createTask);
router.put('/tasks/:id', authenticateToken, updateTask);
router.delete('/tasks/:id', authenticateToken, deleteTask);

export default router;
