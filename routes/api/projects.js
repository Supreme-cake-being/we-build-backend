import express from 'express';
import projectsController from '../../controller/projects-controller.js';
import { isValidId } from '../../middlewares/index.js';

const router = express.Router();

router.get('/', projectsController.getAll);

router.get('/:projectId', isValidId.project, projectsController.getById);

export default router;
