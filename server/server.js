const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const fetch = require('node-fetch');

const mongoURI = "mongodb+srv://kaeny:busta@clusterfk.l2djg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(mongoURI);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/bingSearch', (req, res) => {
  console.log(req.body);
  return res.sendStatus(200);
})
app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname,'../index.html'));
});






/**
 * 404 handler
 */
 app.use('*', (req,res) => {
  res.status(404).send('Not Found');
});

/**
 * Global error handler
 */
 app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => console.log('Listening on port:', PORT));