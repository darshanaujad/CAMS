const mongoose = require('mongoose');

const PermissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // e.g. "create_student", "view_marks"
    },
    action: {
      type: String,     // THIS IS THE ACTION THEN CAN USER PERFORM 
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
        enum: ['Student', 'Teacher', "HOD", "Super_Admin"],  // SUBJECT MEANS WHICH USER CAN PERFORM THAT ACTION 
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
