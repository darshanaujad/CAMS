const express = require('express');
const { registerStudent , login } = require('../controllers/student.controller');
const router = express.Router();

router.post('/register' , registerStudent);
router.post('/login' , login);

module.exports = router;
