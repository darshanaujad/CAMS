const Student = require('../models/student');
const { ThrowConflictException, ThrowBadRequestException, ThrowNotFoundException } = require('../utils/httpResponse');
const { validateRegisterStudent } = require('../utils/validation');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const crypto = require('crypto'); // for random password

const registerStudent = async (req, res) => {
  try {
    const data = req.body;

    // 1️⃣ Validate data
    const validation = validateRegisterStudent(data);
    if (validation.required) {
      return ThrowBadRequestException(res, validation.message);
    }

    // 2️⃣ Check existing student
    const existingStudent = await Student.findOne({
      $or: [
        { email: data.email },
        { phone: data.phone }
      ]
    });

    if (existingStudent) {
      return ThrowConflictException(res, "Student with email or phone already exists.");
    }

    // 3️⃣ Generate random password (8 characters)
    const randomPassword = crypto.randomBytes(4).toString('hex'); 
    // Example: "a4f9c2d1"

    // 4️⃣ Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(randomPassword, salt);

    // 5️⃣ Create new student
   const newStudent = new Student({
  ...data,
  password: hashedPassword,
  status: "pending"
});

await newStudent.save();

return res.status(201).json({
  success: true,
  message: "Student registered successfully, Wait for admin approval.",
  student: {
    _id: newStudent._id,
    name: newStudent.fullname,
    email: newStudent.email,
    status: newStudent.status
  }
});
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Student.findOne({ email, isDeleted: false });

    if (!user) {
        return ThrowNotFoundException(res, "User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return ThrowBadRequestException(res, "Invalid credentials")
    }


    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      success: true,
      token,
      role: user.role,
      name: user.fullName,
      path: '/students/dashboard'
    });




  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { registerStudent , login};