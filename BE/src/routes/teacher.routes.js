const express = require("express");
const router = express.Router();
const { registerTeacher , resetPassword } = require("../controllers/teacher.controller");

router.post("/register", registerTeacher);
router.post("/reset-password" , resetPassword);

module.exports = router;