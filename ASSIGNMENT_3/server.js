const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'lab task 1.html'));
});

app.use((req, res) => {
    res.status(404);
    res.send('<h1>Error 404: Resource not found</h1>');
});

app.listen(3000, () => {
    console.log("App listening on Port 3000");
});
