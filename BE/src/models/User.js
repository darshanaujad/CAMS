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
      type: mongoose.Schema.Types.ObjectId,
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
    isVerified: { type: Boolean, default: false }, // for admin

    // linking sub-documents
    studentDoc: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentDoc",
    },
    teacherDoc: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TeacherDoc",
    },
    hodDoc: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HodDoc",
    },

    deletedAt: { type: Date | null, default: null },
    createdBy: { type: mongoose.Schema.Types.ObjectId },
  },
  { timestamps: true }
);

// hashing password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
