const Student = require('../models/student');
const { validateRegisterStudent } = require('../utils/validation');



const registerStudent = async (req, res)=>{
   try {
        const data = req.body;
        const validation = validateRegisterStudent(data);
      
      if(validation.required){
        return res.status(400).json({message:validation.message});
      }
      res.status(200).json({message:"Register Student Successfull"});

   } catch (error) {
    
   }
}

module.exports = {registerStudent}