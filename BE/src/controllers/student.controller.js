const Student = require('../models/student');



const registerStudent = async (req, res)=>{
    console.log(req.body);
    res.status(201).json({message:"Student register successfull"});
}

module.exports = {registerStudent}