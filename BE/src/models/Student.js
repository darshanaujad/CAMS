const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    // 🔹 Basic Information
    name: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    rollNo: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    profilePhoto: {
      type: String, // image URL or file path
    },

    // 🔹 Personal Details
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    dob: {
      type: Date,
      required: true,
    },

    age: {
      type: Number,
      min: 1,
    },

    caste: {
      type: String,
    },

    religion: {
      type: String,
    },

    region: {
      type: String,
    },

    // 🔹 Address (Structured)
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
    },

    // 🔹 Academic Details
    department: {
      type: String,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    admissionYear: {
      type: Number,
    },

    isGraduated: {
      type: Boolean,
      default: false,
    },

    // 🔹 Guardian Details
    guardianName: {
      type: String,
    },

    guardianPhone: {
      type: String,
    },

    // 🔹 Documents
    documents: {
      tenthMarksheet: {
        type: String, // file URL or path
        required: true,
      },
      twelfthMarksheet: {
        type: String, // file URL or path
        required: true,
      },
      aadhaarCard: {
        type: String,
      },
      casteCertificate: {
        type: String,
      },
    },

    // 🔹 Role & Status
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },

    status: {
      type: String,
      enum: ["active", "inactive", "blocked"],
      default: "active",
    },

    // 🔹 Verification
    isVerified: {
      type: Boolean,
      default: false,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    // 🔹 Auth & Security
    lastLogin: {
      type: Date,
    },

    resetPasswordToken: {
      type: String,
    },

    resetPasswordExpire: {
      type: Date,
    },

    // 🔹 Soft Delete
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

module.exports = mongoose.model("Student", studentSchema);
