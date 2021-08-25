const queryController = {};
const apiKey = 'AIzaSyAGiy2bgn82nEtpQajchCXwIL13GmCDais';
const engineId = 'd2fff8621f83c9845';
const url = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyAGiy2bgn82nEtpQajchCXwIL13GmCDais&cx=017576662512468239146:omuauf_lfve&q=cars'


queryController.setQuery = (req, res, next) => {
  console.log("yo");
  return next();
}


module.exports = queryController;