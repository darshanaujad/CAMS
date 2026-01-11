require('dotenv').config();
require('./config/db')
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT;

app.use(cors()); // for now allowing every ip but change it later 

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended:true, limit:'50mb'}));

// TODO: IMPORT ALL THE ROUTES HERE FOR API CALLING

app.get('/' , (req,res)=>{
    res.send("Server is running");
});

app.listen(PORT , ()=>{
    console.log("Server is running on " , PORT)
})
