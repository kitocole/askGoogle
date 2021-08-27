const fetch = require('node-fetch');
const https = require('https');
const express = require('express');

const queryController = require('../controllers/queryController.js');
const router = express.Router();
const API_KEY = 'ca7b702bf6c646449330d37df9ae1dc9';

router.post('/', async (req, res) => {
  const query = req.body.query;

  // console.log(encodeURIComponent(query));
  const data = await bingQuery(query);
  // console.log(data.webPages);
  return res.status(200).json(data);
})


const bingQuery = async (query) => {
  let url = 'https://api.bing.microsoft.com/v7.0/search?q=';
  url = url.concat(encodeURIComponent(query));
  url = new URL(url);
  // console.log(url);
  const data = await fetch(url, {
    method: 'GET',
    headers:{
      'Ocp-Apim-Subscription-Key': API_KEY
    }
  }).then(response => response.json())
  .then(data => {
    return data;
  })
  .catch(err => console.log(err));
  return data.webpages;
}
module.exports= router;