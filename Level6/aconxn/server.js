const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const { expressjwt } = require('express-jwt');
const cors = require('cors');
const passport = require('passport');
//const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const AppleStrategy = require('passport-apple').Strategy;
const session = require('express-session');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 9000;

if (!process.env.MONGO_URI) {
    console.error('Error: MONGO_URI is not defined in .env file.');
    process.exit(1);
}

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
// app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// Passport configuration for Google OAuth
// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: process.env.GOOGLE_CALLBACK_URL
// },
// (accessToken, refreshToken, profile, done) => {
//     done(null, profile);
// }));

// Passport configuration for Apple OAuth (commented out)
// passport.use(new AppleStrategy({
//     clientID: process.env.APPLE_CLIENT_ID,
//     teamID: process.env.APPLE_TEAM_ID,
//     keyID: process.env.APPLE_KEY_ID,
//     key: process.env.APPLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Replace escaped newline characters
//     callbackURL: process.env.APPLE_CALLBACK_URL,
//     scope: ['name', 'email']
// },
// (accessToken, refreshToken, profile, done) => {
//     done(null, profile);
// }));

// passport.serializeUser((user, done) => {
//     done(null, user);
// });

// passport.deserializeUser((user, done) => {
//     done(null, user);
// });

// // Routes for Google OAuth
// app.get('/auth/google',
//     passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// app.get('/auth/google/callback',
//     passport.authenticate('google', { failureRedirect: '/' }),
//     (req, res) => {
//         res.redirect('http://localhost:3000'); // Redirect to frontend after login
//     });

// Routes for Apple OAuth (commented out)
// app.get('/auth/apple',
//     passport.authenticate('apple'));

// app.get('/auth/apple/callback',
//     passport.authenticate('apple', { failureRedirect: '/' }),
//     (req, res) => {
//         res.redirect('http://localhost:3000');
//     }
// );

// Route to get user data
app.get('/api/user', (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
});

// MongoDB connection
const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)            
        console.log('Connected to MongoDB.')
    } catch (error) {
        console.error('Error connecting to MongoDB: ', error);
        process.exit(1);
    }
};

connectToDb();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
