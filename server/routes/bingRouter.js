// const fetch = require('node-fetch');
const express = require('express');

const queryController = require('../controllers/queryController.js');
const router = express.Router();
<<<<<<< HEAD

=======
const API_KEY = 'secret';
>>>>>>> 4b479f528462657907472cb5ed87b3676c224c6e

router.post('/', queryController.bingQuery, queryController.addResults, (req, res) => {
  // console.log(res.locals.webpages);

  // console.log(encodeURIComponent(query));
  // const data = await bingQuery(query);
  // console.log(data);
  return res.status(200).json(res.locals.results);
})


<<<<<<< HEAD
module.exports= router;
=======
// router.post('/', async (req, res) => {
//   const query = req.body.query;

//   // console.log(encodeURIComponent(query));
//   const data = await bingQuery(query);
//   // console.log(data);
//   return res.status(200).json(data.webpages);
// })

// const bingQuery = async (query) => {
//   let url = 'https://api.bing.microsoft.com/v7.0/search?q=';
//   url = url.concat(encodeURIComponent(query));
//   url = new URL(url);
//   // console.log(url);
//   const data = await fetch(url, {
//     method: 'GET',
//     headers:{
//       'Ocp-Apim-Subscription-Key': API_KEY
//     }
//   }).then(response => response.json())
//   .then(data => {
//     return data;
//   })
//   .catch(err => console.log(err));
//   return data;
// }
module.exports= router;
>>>>>>> 4b479f528462657907472cb5ed87b3676c224c6e
