const Teacher = require("../models/teacher");
const bcrypt = require("bcryptjs");

// ===============================
// TEACHER REGISTER CONTROLLER
// ===============================

exports.registerTeacher = async (req, res) => {
  try {
    const {
      fullName,
      username,
      email,
      password,
      phone,
      gender,
      dob,
      department,
      subjects,
      qualification,
      experience,
    } = req.body;

    // 1️⃣ Check if teacher already exists
    const existingTeacher = await Teacher.findOne({
      $or: [{ email }, { username }],
    });

    if (existingTeacher) {
      return res.status(400).json({
        message: "Email or Username already exists",
      });
    }

    // 2️⃣ Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3️⃣ Create Teacher
    const newTeacher = new Teacher({
      fullName,
      username,
      email,
      password: hashedPassword,
      phone,
      gender,
      dob,
      department,
      subjects,
      qualification,
      experience,
      isApproved: false, // admin approval required
    });

    await newTeacher.save();

    // 4️⃣ Send Response
    res.status(201).json({
      success: true,
      message: "Teacher registered successfully. Wait for admin approval.",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};