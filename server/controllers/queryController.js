const queryController = {};
const API_KEY = secret;
const fetch = require('node-fetch');

const { Queries, Histories } = require('../models/queryModel');

queryController.createQuery = (req, res, next) => {
  // console.log(res.locals.combined)
  Queries.create({
    question: req.body.question, 
    language: req.body.language, 
    generatedQuery: res.locals.combined
  }, (err, newQuery) => {
    if(err) return next(err);
    res.locals.newQuery = newQuery;
    return next();
  })
}

queryController.getQueries = (req, res, next) => {
  Queries.find({}, (err, query) => {
    if(err) {
      console.log('ERROR IN GET QUERIES');
      return next(err);
    }
    res.locals.queries = query;
    return next();
  } );
}

queryController.deleteQuery = (req, res, next) => {
  const question = req.body.question;
  const language = req.body.language;
  const combined = req.body.generatedQuery;
  Queries.findOneAndDelete({
    question: question, 
    language: language,
    generatedQuery: combined
  }, (err, oldQuery) => {
    if(err) {
      console.log('ERROR IN DELETE QUERIES');
      return next(err);
    }
    // console.log('OLD QUERY', oldQuery);
    res.locals.oldQuery = oldQuery;
    
    return next();
  })
}

queryController.placeInHistory = (req, res, next) => {
  const oldQuery = res.locals.oldQuery;
  // console.log(res.locals.oldQuery);
  Histories.create({
    question: oldQuery.question, 
    language: oldQuery.language, 
    generatedQuery: oldQuery.generatedQuery}, 
    (err, histQuery) => {
      if(err) {
        console.log('ERROR IN PLACING QUERIES TO HISTORY');
        return next(err);
      }
    return next();
  });
}

queryController.getHistory = (req, res, next) => {
  Histories.find({}, (err, history) => {
    if(err) {
      console.log('ERROR IN GET HISTORY');
      return next(err);
    }    res.locals.history = history;
    return next();
  });
}

queryController.deleteHistory = (req, res, next) => {
  Histories.findOneAndDelete({question: req.body.question, language: req.body.language}, (err, removed) => {
    if(err) {
      console.log('ERROR IN DELETE HISTORY');
      return next(err);
    }
    // console.log(removed);
    res.locals.removed = removed;
    return next();
  })
}

queryController.restoreQuery = (req, res, next) => {
  const removed = res.locals.removed;
  // console.log('removed');
  Queries.create({
    question: removed.question, 
    language: removed.language, 
    generatedQuery: removed.generatedQuery}, 
    (err, restored) => {
      if(err) {
        console.log('ERROR IN RESTORE QUERIES');
        return next(err);
      }
      res.locals.restored = restored;
      return next();
  })
}


queryController.combineQueryandLanguage = (req, res, next) => {
  const question = req.body.question;
  const language = req.body.language;
  const combined = question.concat(' ', language);
  // console.log(combined);
  res.locals.combined = combined;
  return next();
}

queryController.bingQuery = async (req, res, next) => {
  let url = 'https://api.bing.microsoft.com/v7.0/search?q=';
  url = url.concat(encodeURIComponent(req.body.combined));
  url = new URL(url);
  const data = await fetch(url, {
    method: 'GET',
    headers:{
      'Ocp-Apim-Subscription-Key': API_KEY
    }
  }).then(response => response.json())
  .then(data => {
    res.locals.webpages = data.webPages;
    // console.log(data.webPages);
    return next();
  })
  .catch(err => console.log(err));
  // return data.webPages;
};

queryController.addResults = async (req, res, next) => {
  const results = await res.locals.webpages.value.map((val) => val.url);
  // results.map((val) => val.url);
  const question = req.body.question;
  const language = req.body.language;
  Queries.findOneAndUpdate({
    question: question, language: language}, 
    {results: results}, 
    (err, updated) => {
      if(err){
        console.log('error in addResults');
        return next(err);
      }
      // console.log(updated);
      res.locals.results = results;
      return next();
    
    })
}


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
//   return data.webpages;
// }


module.exports = queryController;