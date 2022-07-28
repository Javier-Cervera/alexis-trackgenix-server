import mongoose from 'mongoose';

const { Schema } = mongoose;

const tasksSchema = new Schema(
  {
    taskName: { type: String, required: true },
    startDate: { type: Date },
    workedHours: { type: Number, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    isDeleted: { type: Boolean, required: true },
  },
  { timestamps: true },
);

export default mongoose.model('Task', tasksSchema);
