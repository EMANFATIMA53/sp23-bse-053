// app.js
const express = require('express');
const path = require('path');
const app = express();
const adminRoutes = require('./routes/admin');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/admin', adminRoutes);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
