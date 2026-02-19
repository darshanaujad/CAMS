require('dotenv').config()
const jwt = require('jsonwebtoken');

const generateToken = async (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRY});
    return token;
}

const decodeToken = async (token) => {
    const decodedUser =  jwt.verify(token, process.env.JWT_EXPIRY);
    return decodedUser;
}


module.exports = {generateToken, decodeToken};