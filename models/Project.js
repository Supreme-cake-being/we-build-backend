import { Schema, model } from 'mongoose';
import { handleSaveError, runValidatorsAtUpdate } from './hooks.js';

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
    },
    projectInfo: {
      type: String,
      required: [true, 'Project info is required'],
    },
    address: {
      type: String,
      required: [true, 'Project address is required'],
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

projectSchema.post('save', handleSaveError);

projectSchema.pre('findOneAndUpdate', runValidatorsAtUpdate);

projectSchema.post('findOneAndUpdate', handleSaveError);

const Project = model('project', projectSchema);

export default Project;
