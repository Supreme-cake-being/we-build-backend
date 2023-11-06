import express from 'express';
import vacanciesController from '../../controller/vacancies-controller.js';
import {
  authenticate,
  isEmptyBody,
  isValidId,
} from '../../middlewares/index.js';
import { validateBody } from '../../decorators/index.js';
import {
  vacancyAddSchema,
  vacancyUpdateContactInformation,
} from '../../models/Vacancy.js';

const vacancyAddVaidate = validateBody(vacancyAddSchema);
const vacancyUpdateValidate = validateBody(vacancyUpdateContactInformation);

const router = express.Router();

router.get('/', vacanciesController.getAll);

router.get('/:vacancyId', isValidId, vacanciesController.getById);

router.post(
  '/',
  authenticate,
  isEmptyBody,
  vacancyAddVaidate,
  vacanciesController.add
);

router.delete(
  '/:vacancyId',
  authenticate,
  isValidId,
  vacanciesController.deleteById
);

router.put(
  '/:vacancyId',
  authenticate,
  isValidId,
  isEmptyBody,
  vacancyAddVaidate,
  vacanciesController.updateById
);

export default router;
