const Student = require("../models/student");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const approveStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (student.status === "approved") {
      return res.status(400).json({ message: "Student already approved" });
    }

    // 1️⃣ Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    student.status = "approved";
    student.resetToken = resetToken;
    student.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 min

    await student.save();

    // 2️⃣ Create Reset Link
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    // 3️⃣ Send Email
    await sendEmail(
      student.email,
      "Account Approved - Set Your Password",
      `
        <h2>Your account has been approved 🎉</h2>
        <p>Click below to set your password:</p>
        <a href="${resetLink}">Set Password</a>
      `
    );

    res.status(200).json({
      success: true,
      message: "Student approved & email sent"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllStudents = async (req, res) => {
  try {
  
    const students = await Student.find().select("-password");

    res.status(200).json({
      success: true,
      students
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {approveStudent , getAllStudents}