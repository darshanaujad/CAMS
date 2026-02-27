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
app.use('/api/students' , studentRoutes )

const authRoutes = require('../src/routes/auth.routes');
app.use('/api/auth', authRoutes);

const adminRoutes = require("../src/routes/admin.routes");
app.use("/api/admin", adminRoutes);


app.get('/', (req, res) => {
    res.send("Server is running");
});

app.listen(PORT, () => {
    console.log("Server is running on ", PORT)
})
