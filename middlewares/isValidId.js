import { isValidObjectId } from 'mongoose';

import { HttpError } from '../helpers/index.js';

const isValidId = (req, res, next) => {
  const { blogId } = req.params;
  if (!isValidObjectId(blogId)) {
    return next(HttpError(404, `Not found`));
  }
  next();
};

export default isValidId;
