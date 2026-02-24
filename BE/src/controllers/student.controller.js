const Student = require('../models/student');
const { validateRegisterStudent } = require('../utils/validation');
const bcrypt = require('bcryptjs');



const registerStudent = async (req, res) => {
  try {
    const data = req.body;
    const validation = validateRegisterStudent(data);

    if (validation.required) {
      return res.status(400).json({ message: validation.message });
    }

    const existingStudent = await Student.findOne({
      $or: [
        {
          email: data.email,

        },
        {
          phone: data.phone,
        }
      ]
    });
    if(existingStudent){
      return res.status(409).json({message:"student with phone no or email already exists"});
    }

  } catch (error) {

  }
}

module.exports = { registerStudent }
