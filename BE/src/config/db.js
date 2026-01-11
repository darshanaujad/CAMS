require('dotenv').config()
const mongoose = require('mongoose');


const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => console.log("Database Connected Successfully!!"))
    .catch (err => console.log("Error in conecting database", err))


module.exports = mongoose;