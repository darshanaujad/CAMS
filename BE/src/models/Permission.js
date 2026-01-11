const mongoose = require('mongoose');

const PermissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // e.g. "create_student", "view_marks"
    },
    action: {
      type: String,
      enum: [
        "create",
        "view",
        "viewAll",
        "createAny",
        "delete",
        "deleteAny",
        "update",
        "updateAny",
      ],
      required: true,
      trim:true
    },
    subject: {
        type: String,
        enum: ['Student', 'Teacher', "HOD", "Super_Admin"],
        required: true,
        trim: true
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);
const Permission = mongoose.model("Permission", PermissionSchema);
module.exports = Permission;
