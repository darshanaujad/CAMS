const Student = require("../models/Student");
const crypto = require("crypto");
const bcrypt = require("bcryptjs"); // Assuming bcryptjs is installed as seen in User.js

const registerStudent = async (req, res) => {
    try {
        const studentData = req.body;

        // Check if email already exists
        const existingStudent = await Student.findOne({ email: studentData.email });
        if (existingStudent) {
            return res.status(400).json({ message: "Student with this email already exists." });
        }

        // Check if rollNo already exists
        if (studentData.rollNo) {
            const existingRollNo = await Student.findOne({ rollNo: studentData.rollNo });
            if (existingRollNo) {
                return res.status(400).json({ message: "Student with this Roll No already exists." });
            }
        }

        // Check if username already exists
        if (studentData.username) {
            const existingUsername = await Student.findOne({ username: studentData.username });
            if (existingUsername) {
                return res.status(400).json({ message: "Student with this username already exists." });
            }
        }


        // Generate random password
        const randomPassword = crypto.randomBytes(8).toString("hex");

        // Hash the password
        const hashedPassword = await bcrypt.hash(randomPassword, 10);

        // Create reset password token (base64 of email)
        const resetToken = Buffer.from(studentData.email).toString("base64");

        // Set token expiry (48 hours)
        const tokenExpiry = Date.now() + 48 * 60 * 60 * 1000;

        // Prepare new student object
        const newStudent = new Student({
            ...studentData,
            password: hashedPassword,
            resetPasswordToken: resetToken,
            resetPasswordExpire: tokenExpiry,
        });

        // Save to database
        await newStudent.save();

        // Mock sending email
        console.log(`[EMAIL MOCK] Email sent to ${studentData.email}`);
        console.log(`[EMAIL MOCK] Temp Password: ${randomPassword}`);
        console.log(`[EMAIL MOCK] Reset Token: ${resetToken}`);

        res.status(201).json({
            message: "Student registered successfully. Verification email sent.",
            studentId: newStudent._id,
            // In production, do NOT send the password back. 
            // This is just to confirm logic if needed, but user said "reset password email will sent".
            // We will not send password in response.
        });

    } catch (error) {
        console.error("Error registering student:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

module.exports = {
    registerStudent,
};
