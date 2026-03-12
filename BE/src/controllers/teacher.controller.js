const Teacher = require("../models/teacher");
const bcrypt = require("bcryptjs");
const { validateRegisterTeacher } = require('../utils/validation');
const crypto = require('crypto'); // for random password
const { ThrowBadRequestException, ThrowNotFoundException } = require("../utils/httpResponse");
const { generateResetToken } = require("../utils/generateResetToken");
const { sendEmail } = require("../utils/email/emailService");
const resetPasswordTemplate = require("../utils/email/resetPasswordTemplate");
const jwt = require("jsonwebtoken");

// ===============================
// TEACHER REGISTER CONTROLLER
// ===============================

exports.registerTeacher = async (req, res) => {
  try {
    const data = req.body;
    // 1) validate teacher
    const validate = validateRegisterTeacher(data);
    if (validate.required) {
      return ThrowBadRequestException(res, validate.message);
    }

    // 1️⃣ Check if teacher already exists
    const existingTeacher = await Teacher.findOne({
      $or: [{ email: data.email },
      { phone: data.phone }],
    });

    if (existingTeacher) {
      return res.status(409).json({
        message: "Email or Phone already exists",
      });
    }

    const randomPassword = crypto.randomBytes(4).toString('hex');
    let resetPasswordToken = null;
    let resetPasswordExpiry = null;

    // 2️⃣ Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(randomPassword, salt);

    const { base64Token, hashedToken } = generateResetToken(data.email);
    resetPasswordToken = hashedToken;
    resetPasswordExpiry = Date.now() + 48 * 60 * 60 * 1000;

    // 3️⃣ Create Teacher
    const newTeacher = new Teacher({
      ...data,
      password: hashedPassword,
      resetPasswordToken,
      resetPasswordExpiry,
    });

    await newTeacher.save();



    //  Send reset link via email

    //send email to user
    // 3️⃣ Create reset password link
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${base64Token}&auth=teachers`;

    // 4️⃣ Send email (NON-BLOCKING recommended)
    sendEmail({
      to: data.email,
      subject: "Set Your Password",
      html: resetPasswordTemplate({
        username: data.fullName,
        resetLink
      })
    }).catch(err => {
      console.error("Email failed:", err.message);
    });


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

exports.resetPassword = async (req, res) => {
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
    const user = await Teacher.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpiry: { $gt: Date.now() }
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
    user.resetPasswordExpiry = null;
    user.isVerified = true;
    user.verifiedAt = new Date();
    user.isApproved = true;

    await user.save();

    res.json({
      success: true,
      message: "Password reset successful. You can now login."
    });

  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "Internal server error",
      error: err.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let userPath = '';

    const user = await Teacher.findOne({ email, isDeleted: false });

    if (!user) {
        return ThrowNotFoundException(res, "User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return ThrowBadRequestException(res, "Invalid credentials")
    }

    if (user.role === "hod") {
       userPath = '/admin/dashboard'
    } else {
       userPath = '/teachers/dashboard'
    }

    const token = jwt.sign(
      { id: user._id, role:user.role},
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      success: true,
      token,
      role: user.role,
      name: user.fullName,
      path: userPath
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.findAllTeachers = async (req, res) => {
  try {

    let { page = 1, limit = 10, search = "", status } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const skip = (page - 1) * limit;

    const matchStage = {
      role: "teacher",
      isDeleted: false
    };

    if (status) {
      matchStage.status = status;
    }

    if (search) {
      matchStage.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const aggregation = await Teacher.aggregate([
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
          data: [
            { $skip: skip },
            { $limit: limit }
          ],

          totalCount: [
            { $count: "count" }
          ],
        },
      },
    ]);

    const teachers = aggregation[0].data;
    const totalCount = aggregation[0].totalCount[0]?.count || 0;

    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({
      data: teachers,
      page,
      totalPages,
    });

  } catch (error) {

    console.error("Find teachers error:", error);

    res.status(500).json({
      message: "Failed to fetch teachers",
    });

  }
};
