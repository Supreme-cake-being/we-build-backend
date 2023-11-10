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

router.get('/:vacancyId', isValidId.vacancy, vacanciesController.getById);

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
  isValidId.vacancy,
  vacanciesController.deleteById
);

router.put(
  '/:vacancyId',
  authenticate,
  isValidId.vacancy,
  isEmptyBody,
  vacancyAddVaidate,
  vacanciesController.updateById
);

router.patch(
  '/:vacancyId',
  isValidId.vacancy,
  isEmptyBody,
  vacancyUpdateValidate,
  vacanciesController.updateContactInfo
);

export default router;
