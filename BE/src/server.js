require('dotenv').config();
require('./config/db')
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet')
const PORT = process.env.PORT;

app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(','),
    credentials:true
}));

app.use(helmet());

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended:true, limit:'50mb'}));

// TODO: IMPORT ALL THE ROUTES HERE FOR API CALLING

app.get('/' , (req,res)=>{
    res.send("Server is running");
});

app.listen(PORT , ()=>{
    console.log("Server is running on " , PORT)
})
