const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // Student, Teacher, HOD, Super_Admin
    },
    code: {
      type: String,
      required: true,   // THIS MUST BE UNIQUE AND ALWAYS IN UPPER CASE LETTER 
      unique: true,
    },
    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,  // HERE WE HAVE TO ADD THE ID OF PERMISSIONS SO WE CAN SAY THAT THIS ROLE CAN HAVE THIS PERMISSIONS 
        ref: "Permission",
      },
    ],
  },
  { timestamps: true }
);
const Role = mongoose.model("Role", RoleSchema);
module.exports = Role;
