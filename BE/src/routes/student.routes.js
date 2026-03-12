const express = require('express');
const { registerStudent , login, findAllStudents } = require('../controllers/student.controller');
const router = express.Router();

router.post('/register' , registerStudent);
router.post('/login' , login);
router.get('/', findAllStudents)

module.exports = router;
