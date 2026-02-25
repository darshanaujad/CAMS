require('dotenv').config()
require('./config/db');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const studentRoutes = require('./routes/student.routes')
app.use('/api/student' , studentRoutes )

const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

const adminRoutes = require("./routes/admin.routes");
app.use("/api/admin", adminRoutes);


app.get('/', (req, res) => {
    res.send("Server is running");
});

app.listen(PORT, () => {
    console.log("Server is running on ", PORT)
})
