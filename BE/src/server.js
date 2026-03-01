require('dotenv').config()
require('./config/db');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const studentRoutes = require('../src/routes/student.routes')
app.use('/api/students' , studentRoutes );

const teacherRoutes = require("../src/routes/teacher.routes");
app.use("/api/teachers", teacherRoutes);


app.get('/', (req, res) => {
    res.send("Server is running");
});

app.listen(PORT, () => {
    console.log("Server is running on ", PORT)
})
