const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const fetch = require('node-fetch');
const queryController = require('./controllers/queryController.js');
// const { mongoURI } = require('./../secret.js');
const mongoURI = 'SECRET'; 
const bingRouter = require('./routes/bingRouter.js')
mongoose.connect(mongoURI);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/bing', bingRouter);

app.get('/api/getQueries', queryController.getQueries, (req, res) => {
  // console.log(res.locals);
  return res.status(200).json(res.locals.queries);
});

app.post('/api/newQuery', queryController.combineQueryandLanguage, queryController.createQuery, (req, res) => {
  // console.log(req.body);
  return res.status(200).json(res.locals.newQuery);
});

app.delete('/api/deleteQuery', queryController.deleteQuery, queryController.placeInHistory, (req, res) => {
  return res.status(200).send(res.locals.oldQuery);
});

app.get('/api/getHistory', queryController.getHistory, (req, res) => {
  return res.status(200).json(res.locals.history);
})

app.delete('/api/deleteHistory', queryController.deleteHistory, (req, res) => {
  return res.sendStatus(200);
})

app.delete('/api/restoreQuery', queryController.deleteHistory, queryController.restoreQuery, (req, res) => {
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
  return res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => console.log('Listening on port:', PORT));
