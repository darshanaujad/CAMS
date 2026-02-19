const Cloudinary = require('cloudinary').v2;
require('dotenv').config();

Cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = Cloudinary;


// TODO: PLEASE ADD YOUR CREDENTIALS IN THE ENV FOR USING THIS CLOUDINARY 