require('./config/db');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(',') || '*',
    credentials: true
}));

app.use(helmet());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// TODO: IMPORT ALL THE ROUTES HERE FOR API CALLING
const studentRoutes = require('./routes/student.routes');

app.use('/api/student', studentRoutes);

app.get('/', (req, res) => {
    res.send("Server is running");
});

app.listen(PORT, () => {
    console.log("Server is running on ", PORT)
})
