import { HttpError } from './index.js';

const isRightRole = (role, neededRole) => {
  if (role !== neededRole) {
    throw HttpError(403, 'Forbidden, if you are not SMM');
  }
};

export default isRightRole;
