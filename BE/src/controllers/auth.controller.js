// const Admin = require('../models/admin');
const Student = require('../models/student');
// const Teacher = require('../models/teacher');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const login = async (req, res) => {
  try {
    console.log("BODY:", req.body); // 👈 ADD THIS

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required"
      });
    }

    let user = await Student.findOne({ email });

    console.log("USER:", user); // 👈 ADD THIS

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("PASSWORD MATCH:", isMatch); // 👈 ADD THIS

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { id: user._id, role: "student" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      token
    });

  } catch (error) {
    console.log("ERROR:", error); // 👈 VERY IMPORTANT
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

module.exports = { login };