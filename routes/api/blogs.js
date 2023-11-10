import express from 'express';
import blogsController from '../../controller/blogs-controller.js';
import {
  authenticate,
  isEmptyBody,
  isValidId,
} from '../../middlewares/index.js';
import { validateBody } from '../../decorators/index.js';
import { blogAddSchema } from '../../models/Blog.js';

const blogAddValidate = validateBody(blogAddSchema);

const router = express.Router();

router.get('/', blogsController.getAll);

router.get('/:blogId', isValidId.blog, blogsController.getById);

router.post(
  '/',
  authenticate,
  isEmptyBody,
  blogAddValidate,
  blogsController.add
);

router.delete(
  '/:blogId',
  authenticate,
  isValidId.blog,
  blogsController.deleteById
);

router.put(
  '/:blogId',
  authenticate,
  isValidId.blog,
  isEmptyBody,
  blogAddValidate,
  blogsController.updateById
);

export default router;
