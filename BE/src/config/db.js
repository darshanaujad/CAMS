require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL ;

mongoose.connect(MONGO_URL)
  .then(()=> console.log("Database connected!"))
  .catch(err => console.log("Error!" , err));

  module.export = mongoose ;

