const express = require('express');
const { registerStudent , login, findAllStudents, approveStudent , resetPassword} = require('../controllers/student.controller');
const router = express.Router();

router.post('/register' , registerStudent);
router.post('/login' , login);
router.get('/', findAllStudents);
router.patch('/approve/:id' , approveStudent);
router.post("/reset-password" , resetPassword);

module.exports = router;
