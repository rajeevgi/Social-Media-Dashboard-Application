const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('./config/database');

dotenv.config();

// Middleware
const app = express();

app.use(cors({
    origin : 'http://localhost:4200',
    credentials : true
}));

app.use(express.json());

// Routes
const authRoutes = require('./routes/AuthRoutes');
app.use('/api/auth', authRoutes);

const userRoutes = require('./routes/UserRoutes');
app.use('/api/user', userRoutes);

const postRoutes = require('./routes/PostRoutes');
app.use('/api/post', postRoutes);

const commentRoutes = require('./routes/CommentRoutes');
app.use('/api/comment', commentRoutes);

const dashboardRoutes = require('./routes/DashboardRoutes');
app.use('/api/dashboard', dashboardRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})