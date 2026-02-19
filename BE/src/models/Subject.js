const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,       // THIS IS THE NAME OF THE SUBJECT 
    },

    subjectCode: {
      type: String,
      required: true,
      unique: true, // e.g., CSE101, MATH201
    },

    department: {
      type: String,
      required: true, // e.g., BCA
    },

    semester: {
      type: Number,
      required: true, // 1-6
    },

    year: {
      type: Number,
      required: true, // 1-3 (if UG)
    },

    credits: {
      type: Number,
      default: 2, // Typical credit value
    },

    // Teacher assigned to this subject 
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // role = teacher
    },

    // HOD responsible for this subject
    hodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // Optional description
    description: {
      type: String,
    },

    // Subject type (Theory / Lab / Practical / Project)
    type: {
      type: String,
      enum: ["theory", "lab", "practical", "project"],
      default: "theory",
    },

    // Status of subject (active/inactive)
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    deleted: {
        type: Boolean,
        default: false,
    }
  },
  { timestamps: true }
);


const Subject = mongoose.model("Subject", SubjectSchema);

module.exports = Subject;