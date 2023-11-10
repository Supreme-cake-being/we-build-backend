import { isValidObjectId } from 'mongoose';

import { HttpError } from '../helpers/index.js';

const blog = (req, res, next) => {
  const { blogId } = req.params;
  if (!isValidObjectId(blogId)) {
    return next(HttpError(404, `Not found`));
  }
  next();
};

const vacancy = (req, res, next) => {
  const { vacancyId } = req.params;
  if (!isValidObjectId(vacancyId)) {
    return next(HttpError(404, `Not found`));
  }
  next();
};

export default { blog, vacancy };
