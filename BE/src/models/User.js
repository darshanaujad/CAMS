const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    middleName: { type: String, require: true },
    lastName: { type: String, required: true },

    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    phone: { type: String, required: true, unique: true },

    role: {
      type: mongoose.Schema.Types.ObjectId,      //HERE WE HAVE TO SAVE THE ROLE ID OF ROLE WE ARE CREATING 
      ref: "Role",
      required: true,
    },

    profilePhoto: { type: String },

    status: {
      type: String,
      enum: ["active", "inactive", "blocked"],
      default: "active",
    },

    lastLoginAt: { type: Date },
    isVerified: { type: Boolean, default: false }, // THIS WILL BECOME TRUE WHEN ADMIN OR TEACHER APPROVED

    // linking sub-documents
    studentDoc: {
      type: mongoose.Schema.Types.ObjectId,   // FOR STUDENT DOUCUMENTS LIKE ADHAR PAN AND EVERYTHING
      ref: "StudentDoc",
    },
    teacherDoc: {
      type: mongoose.Schema.Types.ObjectId, // SAME FOR TEACHER 
      ref: "TeacherDoc",
    },
    hodDoc: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HodDoc",
    },

    deletedAt: { type: Date | null, default: null },   // TO SOFT DELETE A USER NOT PEMENET USER DELETE 
    createdBy: { type: mongoose.Schema.Types.ObjectId },
  },
  { timestamps: true }
);

// hashing password
UserSchema.pre("save", async function (next) { 
  if (!this.isModified("password")) return next();     // ALSO LEARNED ABOUT THE PRE AND METHOD USED IN MONGODB IT WILL DO BEFORE DATA GETTING STORED IT WILL HASH THE PASSWORD AUTOMATICALLY
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);    // THIS METHOD IS USED FOR COMPARING THE PASSWORD 
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
