const express = require("express");
const router = express.Router();
const { approveStudent } = require("../controllers/admin.controller");
const { verifyToken, authorizeRole } = require("../middleware/authMiddleware");

router.put(
  "/approve-student/:id",
  verifyToken,
  authorizeRole("admin"),
  approveStudent
);

module.exports = router;