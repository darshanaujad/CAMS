const Teacher = require("../models/teacher");
const bcrypt = require("bcryptjs");
const {validateRegisterTeacher} = require('../utils/validation');
const crypto = require('crypto'); // for random password
const { ThrowBadRequestException } = require("../utils/httpResponse");

// ===============================
// TEACHER REGISTER CONTROLLER
// ===============================

exports.registerTeacher = async (req, res) => {
  try {
     const data = req.body;
    // 1) validate teacher
   const validate = validateRegisterTeacher(data);
   if(validate.required){
        return ThrowBadRequestException(res , validate.message);
   }

    // 1️⃣ Check if teacher already exists
    const existingTeacher = await Teacher.findOne({
      $or: [{ email: data.email },
        { phone: data.phone }],
    });

    if (existingTeacher) {
      return res.status(400).json({
        message: "Email or Username already exists",
      });
    }

     const randomPassword = crypto.randomBytes(4).toString('hex'); 

    // 2️⃣ Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(randomPassword, salt);

    // 3️⃣ Create Teacher
    const newTeacher = new Teacher({
      ...data,
      password:hashedPassword ,
    });

    await newTeacher.save();

    // 4️⃣ Send Response
    res.status(201).json({
      success: true,
      message: "Teacher registered successfully.",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};