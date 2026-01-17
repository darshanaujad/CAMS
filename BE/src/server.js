require('dotenv').config();
require('./config/db');
const express = require('express');
const cors = require('cors');
// const rateLimiter = require('express-rate-limiter')
const app = express();
const PORT = process.env.PORT;



app.get('/' , (req,res)=>{
    res.send("Server is running");
});

app.listen(PORT , ()=>{
    console.log("Server is running on " , PORT)
})
