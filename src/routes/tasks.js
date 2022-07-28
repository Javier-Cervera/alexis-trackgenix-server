import express from 'express';
import tasksControllers from '../controllers/tasks';
import tasksValidation from '../validation/tasks';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', authMiddleware.authUser, tasksControllers.getAllTasks)
  .get('/deleted', authMiddleware.authAdmin, tasksControllers.getDeletedTasks)
  .post('/', authMiddleware.authUser, tasksValidation.validateCreation, tasksControllers.createTask)
  .put('/:id', authMiddleware.authUser, tasksValidation.validateUpdate, tasksControllers.updateTask)
  .delete('/:id', authMiddleware.authUser, tasksControllers.deleteTask)
  .delete('/remove/:id', authMiddleware.authAdmin, tasksControllers.removeTask);

export default router;
