const express = require("express");
const router = express.Router();
const { registerTeacher , resetPassword , login, findAllTeachers} = require("../controllers/teacher.controller");

router.post("/register", registerTeacher);
router.post("/reset-password" , resetPassword);
router.post("/login" , login);
router.get('/' , findAllTeachers);

module.exports = router;