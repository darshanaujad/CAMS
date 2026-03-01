const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    dob: {
      type: Date,
      required: false,
    },

    department: {
      type: String,
      required: true,
    },

    subjects: [
      {
        type: String,
      }
    ],

    qualification: {
      type: String,
      required: true,
    },

    experience: {
      type: Number, // in years
      default: 0,
    },

    role: {
      type: String,
      enum: ["teacher", "hod"],
      default: "teacher",
    },

    isApproved: {
      type: Boolean,
      default: false, // Admin will approve teacher
    },

    profileImage: {
      type: String, // Cloudinary URL
    },
    isVerified:{
        type:Boolean,
        default:false,     
    },
    verifiedAt:{
        type:Date,
        default:null,
    },
    isDeleted:{
        type:Boolean,
        default:false,
    },
    deletedAt:{
        type:Date,
        default:null,
    },
    resetPasswordToken:{
        type:String,

    },
    resetPasswordExpiry:{
        type:Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", teacherSchema);