import { Schema, model } from 'mongoose';
import Joi from 'joi';
import { handleSaveError, runValidatorsAtUpdate } from './hooks.js';

const errorMessages = {
  'string.base': '{#label} must be a string.',
  'string.empty': '{#label} cannot be empty.',
  'string.min': 'Field {#label} should be at least {#limit} characters long',
  'string.max': 'Field {#label} should not be longer than {#limit}',
  'number.min': '{#label} should not be less than 0$',
  'number.max': '{#label} should not be larger than 10 000$',
  'any.required': '{#label} is required',
};

const updateContactInfoErrorMessages = {
  'string.base': '{#label} must be a string.',
  'string.empty': '{#label} cannot be empty.',
  'string.pattern': '{#label} does not match the pattern',
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
    contactEmail: {
      type: String,
      default: '',
    },
    contactNumber: {
      type: String,
      default: '',
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
  // contactEmail: Joi.string(),
  // contactNumber: Joi.string(),
}).messages(errorMessages);

export const vacancyUpdateContactInformation = Joi.object({
  contactEmail: Joi.string()
    .pattern(new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'))
    .required(),
  contactNumber: Joi.string()
    .pattern(new RegExp('^[(]?[0-9]{3}[)]?[-\\s.]?[0-9]{3}[-\\s.]?[0-9]{4,6}$'))
    .required(),
}).messages();

const Vacancy = model('vacancy', vacancySchema);

export default Vacancy;
