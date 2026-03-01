const express = require("express");
const router = express.Router();
const { registerTeacher , resetPassword , login} = require("../controllers/teacher.controller");

router.post("/register", registerTeacher);
router.post("/reset-password" , resetPassword);
router.post("/login" , login);

module.exports = router;