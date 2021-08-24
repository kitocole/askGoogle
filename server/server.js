const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.listen(PORT, () => console.log('Listening on port:', PORT));