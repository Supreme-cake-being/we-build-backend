import { Schema, model } from 'mongoose';
import Joi from 'joi';
import { handleSaveError, runValidatorsAtUpdate } from './hooks.js';

const messagesErrors = {
  'string.base': 'Field {#label} must be a string.',
  'string.empty': 'Field {#label} cannot be empty.',
  'string.min': 'Field {#label} should be at least {#limit} characters long',
  'string.max': 'Field {#label} should not be longer than {#limit}',
  'any.required': 'Missing required {#label} field',
};

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required'],
    },
    text: {
      type: String,
      required: [true, 'Blog text is required'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

blogSchema.post('save', handleSaveError);

blogSchema.pre('findOneAndUpdate', runValidatorsAtUpdate);

blogSchema.post('findOneAndUpdate', handleSaveError);

export const blogsAddSchema = Joi.object({
  title: Joi.string().min(4).required(),
  text: Joi.string().min(8).max(300).required(),
}).messages({ ...messagesErrors });

const Blog = model('blog', blogSchema);

export default Blog;
