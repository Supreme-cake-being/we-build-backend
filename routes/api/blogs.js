import express from 'express';
import blogsController from '../../controller/blogs-controller.js';
import {
  authenticate,
  isEmptyBody,
  isValidId,
} from '../../middlewares/index.js';
import { validateBody } from '../../decorators/index.js';
import { blogsAddSchema } from '../../models/Blog.js';

const blogAddValidate = validateBody(blogsAddSchema);

const router = express.Router();

router.get('/', blogsController.getAll);

router.get('/:blogId', isValidId, blogsController.getById);

router.post('/', authenticate, isEmptyBody, blogsController.add);

router.delete('/:blogId', authenticate, isValidId, blogsController.deleteById);

router.put(
  '/:blogId',
  authenticate,
  isValidId,
  isEmptyBody,
  blogsController.updateById
);

export default router;
