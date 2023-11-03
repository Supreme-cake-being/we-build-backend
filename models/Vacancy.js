import { Schema, model } from 'mongoose';
import Joi from 'joi';
import { handleSaveError, runValidatorsAtUpdate } from './hooks.js';

const messagesErrors = {
  'string.base': '{#label} must be a string.',
  'string.empty': '{#label} cannot be empty.',
  'string.min': 'Field {#label} should be at least {#limit} characters long',
  'string.max': 'Field {#label} should not be longer than {#limit}',
  'number.min': '{#label} should not be less than 0$',
  'number.max': '{#label} should not be larger than 10 000$',
  'any.required': '{#label} is required',
};

const vacancySchema = new Schema(
  {
    position: {
      type: String,
      required: [true, 'Position is required'],
    },
    salary: {
      type: Number,
      required: [true, 'Salary is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    hr: {
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

vacancySchema.post('save', handleSaveError);

vacancySchema.pre('findOneAndUpdate', runValidatorsAtUpdate);

vacancySchema.post('findOneAndUpdate', handleSaveError);

export const vacancyAddSchema = Joi.object({
  position: Joi.string().min(2).max(50).required(),
  salary: Joi.number().min(0).max(10000).required(),
  description: Joi.string().min(8).max(1000).required(),
}).messages(messagesErrors);

const Vacancy = model('vacancy', vacancySchema);
