import { HttpError } from '../helpers/index.js';
import { ctrlWrapper } from '../decorators/index.js';
import Blog from '../models/Blog.js';

const getAll = async (req, res, next) => {
  const result = await Blog.find();
  res.json(result);
};

const getById = async (req, res, next) => {
  const { blogId } = req.params;

  const result = await Blog.findOne({ _id: blogId });
  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

const add = async (req, res, next) => {
  const owner = req.user;
  const result = await Blog.create({ ...req.body, owner });
  res.status(201).json(result);
};

const deleteById = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { blogId } = req.params;

  const result = await Blog.findOneAndDelete({ _id: blogId, owner });

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json({ message: 'Post deleted' });
};

const updateById = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { blogId } = req.params;

  const result = await Blog.findOneAndUpdate({ _id: blogId, owner }, req.body);
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
};
