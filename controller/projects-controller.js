import { HttpError, isRightRole } from '../helpers/index.js';
import { ctrlWrapper } from '../decorators/index.js';
import Project from '../models/Project.js';

const getAll = async (req, res, next) => {
  const result = await Project.find();
  res.json(result);
};

const getById = async (req, res, next) => {
  const { projectId } = req.params;

  const result = await Project.findOne({ _id: projectId });
  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
};
