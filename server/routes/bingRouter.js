// const fetch = require('node-fetch');
const express = require('express');

const queryController = require('../controllers/queryController.js');
const router = express.Router();


router.post('/', queryController.bingQuery, queryController.addResults, (req, res) => {
  // console.log(res.locals.webpages);

  // console.log(encodeURIComponent(query));
  // const data = await bingQuery(query);
  // console.log(data);
  return res.status(200).json(res.locals.results);
})


module.exports= router;