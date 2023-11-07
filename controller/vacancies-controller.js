import { HttpError, isRightRole } from '../helpers/index.js';
import { ctrlWrapper } from '../decorators/index.js';
import Vacancy from '../models/Vacancy.js';

const getAll = async (req, res, next) => {
  const result = await Vacancy.find();
  res.json(result);
};

const getById = async (req, res, next) => {
  const { vacancyId } = req.params;

  const result = await Vacancy.findOne({ _id: vacancyId });
  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

const add = async (req, res, next) => {
  const owner = req.user;

  isRightRole(owner.role, 'hr');

  const result = await Vacancy.create({ ...req.body, hr: owner });
  res.status(201).json(result);
};

const deleteById = async (req, res, next) => {
  const { _id: owner, role } = req.user;
  const { vacancyId } = req.params;

  isRightRole(role, 'hr');

  const result = await Vacancy.findOneAndDelete({ _id: vacancyId, hr: owner });

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json({ message: 'Vacancy deleted' });
};

const updateById = async (req, res, next) => {
  const { _id: owner, role } = req.user;
  const { vacancyId } = req.params;

  isRightRole(role, 'hr');

  console.log(vacancyId);

  const result = await Vacancy.findOneAndUpdate(
    { _id: vacancyId, hr: owner },
    req.body
  );
  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

const updateContactInfo = async (req, res, next) => {
  const { vacancyId } = req.params;

  const result = await Vacancy.findOneAndUpdate({ _id: vacancyId }, req.body);
  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateContactInfo: ctrlWrapper(updateContactInfo),
};
