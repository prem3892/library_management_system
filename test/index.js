import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

const users = [];

// Generate JWT
const generateToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

// Generate Refresh Token
const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });
};

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Register User (For demonstration)
app.post('/register', (req, res) => {
    const { username } = req.body;
    const user = { id: users.length + 1, username };
    users.push(user);
    res.status(201).json(user);
});

// Login User
app.post('/login', (req, res) => {
    const { username } = req.body;
    const user = users.find(u => u.username === username);
    if (!user) return res.sendStatus(404);

    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);
    
    // Set cookies
    res.cookie('accessToken', token, { httpOnly: true, maxAge: 15 * 60 * 1000 }); // 15 minutes
    res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 }); // 7 days

    res.json({ message: "Logged in successfully" });
});

// Token Refresh
app.post('/refresh', (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.sendStatus(401);
    
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        
        const newToken = generateToken(user);
        res.cookie('accessToken', newToken, { httpOnly: true, maxAge: 15 * 60 * 1000 });
        res.json({ message: "Token refreshed" });
    });
});

// Protected Route
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: "Protected data", user: req.user });
});

// Logout User
app.post('/logout', (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.json({ message: "Logged out successfully" });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
