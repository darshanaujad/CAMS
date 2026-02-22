const express = require('express');
const { registerStudent } = require('../controllers/student.controller');
const router = express.Router();

router.post('/register' , registerStudent);

module.exports = router;
