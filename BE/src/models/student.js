const mongoose = require("mongoose");
const { CATEGORIES, RELIGIONS, DEPARTMENTS, YEARS } = require("../common/constant");

const studentSchema = new mongoose.Schema(
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
    },
    password:{
        type:String,
        required:true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    caste: String,
    category: {
      type: String,
      enum: CATEGORIES,
      required: true,
    },
    religion: {
        type:String,
        enum:RELIGIONS,
        required:true,
    },
    department: {
      type: String,
      enum:DEPARTMENTS,
      required: true,
    },
    year: {
      type: String,
        enum:YEARS,
      required: true,
    },
    addmissionYear:{
        type:String,
        required:true,
    },
    SSCMarksheet: {
      type: String, // file path or cloudinary URL
      required: true,
    },
    HSCMarksheet: {
      type: String,
      required: true,
    },
    
    isVerified:{
        type:Boolean,
        default:false,     
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
    resetTokenExpiry:{
        type:Date,
    },
    status:{
      type:String,
      enum:["pending" , "approve" , "rejected"],
      default: "pending",
    },
    role:{
      type:String,
      enum:["student" , "teacher" , "HOD"],
      default:"student",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);