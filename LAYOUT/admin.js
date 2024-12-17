// routes/admin.js
const express = require('express');
const router = express.Router();

// Admin login page
router.get('/login', (req, res) => {
    res.render('admin/login');
});

// Handle login form submission
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password') {
        return res.redirect('/admin/dashboard');
    } else {
        return res.redirect('/admin/login');
    }
});

// Admin dashboard page
router.get('/dashboard', (req, res) => {
    res.render('admin/dashboard');
});

module.exports = router;
