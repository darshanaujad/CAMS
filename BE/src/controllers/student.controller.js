const Student = require("../models/student");
const {
  ThrowConflictException,
  ThrowBadRequestException,
  ThrowNotFoundException,
} = require("../utils/httpResponse");
const { validateRegisterStudent } = require("../utils/validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto"); // for random password
const { generateResetToken } = require("../utils/generateResetToken");
const { sendEmail } = require("../utils/email/emailService");
const resetPasswordTemplate = require("../utils/email/resetPasswordTemplate");

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
      $or: [{ email: data.email }, { phone: data.phone }],
    });

    if (existingStudent) {
      return ThrowConflictException(
        res,
        "Student with email or phone already exists.",
      );
    }

    // 3️⃣ Generate random password (8 characters)
    const randomPassword = crypto.randomBytes(4).toString("hex");
    // Example: "a4f9c2d1"

    // 4️⃣ Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(randomPassword, salt);

    // 5️⃣ Create new student
    const newStudent = new Student({
      ...data,
      password: hashedPassword,
      status: "pending",
    });

    await newStudent.save();

    return res.status(201).json({
      success: true,
      message: "Student registered successfully, Wait for admin approval.",
      student: {
        _id: newStudent._id,
        name: newStudent.fullName,
        email: newStudent.email,
        status: newStudent.status,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
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
      return ThrowBadRequestException(res, "Invalid credentials");
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    return res.json({
      success: true,
      token,
      role: user.role,
      name: user.fullName,
      path: "/students/dashboard",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const findAllStudents = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "", status } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const skip = (page - 1) * limit;

    // MATCH STAGE
    const matchStage = {
      role: "student",
      isDeleted: false
    };

    if (status) {
      matchStage.status = status;
    }

    if (search) {
      matchStage.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const aggregation = await Student.aggregate([
      { $match: matchStage },

      {
        $project: {
          fullName: 1,
          email: 1,
          department: 1,
          status: 1,
          createdAt: 1,
        },
      },

      { $sort: { createdAt: -1 } },

      {
        $facet: {
          data: [{ $skip: skip }, { $limit: limit }],

          totalCount: [{ $count: "count" }],
        },
      },
    ]);

    const students = aggregation[0].data;
    const totalCount = aggregation[0].totalCount[0]?.count || 0;

    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({
      data: students,
      page,
      totalPages,
    });
  } catch (error) {
    console.error("Find students error:", error);

    res.status(500).json({
      message: "Failed to fetch students",
    });
  }
};
const approveStudent = async (req, res) => {

  try {

    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const { base64Token, hashedToken } = generateResetToken(student.email);

    student.status = "approved";
    student.resetPasswordToken = hashedToken;
    student.resetTokenExpiry = Date.now() + 3600000;

    await student.save();

    const resetLink =
      `${process.env.FRONTEND_URL}/reset-password?token=${base64Token}&auth=students`;

    // Send Email here
    // 4️⃣ Send email (NON-BLOCKING recommended)
        sendEmail({
          to: student.email,
          subject: "Set Your Password",
          html: resetPasswordTemplate({
            username: student.fullName,
            resetLink
          })
        }).catch(err => {
          console.error("Email failed:", err.message);
        });

    res.json({
      message: "Student approved. Reset link sent.",
      resetLink
    });

  } catch (error) {
    console.log("error is ", error)
    res.status(500).json({ message: error.message });
  }
};
  const resetPassword = async (req, res) => {
    try {
      const { token, newPassword } = req.body;
  
      if (!token || !newPassword) {
        return res.status(400).json({
          message: "Token and new password are required"
        });
      }
  
      // Hash incoming token
      const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
  
      // Find user with valid token
      const user = await Student.findOne({
        resetPasswordToken: hashedToken,
        resetTokenExpiry: { $gt: Date.now() }
      });
  
      if (!user) {
        return res.status(400).json({
          message: "Invalid or expired reset token"
        });
      }
  
      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Update user
      user.password = hashedPassword;
      user.resetPasswordToken = null;
      user.resetTokenExpiry = null;
      user.isVerified = true;
      user.verifiedAt = new Date();
     
      
  
      await user.save();
  
      res.json({
        success: true,
        message: "Password reset successful. You can now login."
      });
  
    } catch (err) {
      console.log("error is",err)
      res.status(500).json({
        message: "Internal server error",
        error: err.message
      });
    }
  

};

module.exports = { registerStudent, login, findAllStudents , resetPassword , approveStudent};
