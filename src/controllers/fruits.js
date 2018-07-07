const fruits = require('./../model/index');

exports.get = (req, res) => {
  res.render('fruits', { csrfToken: req.csrfToken(),  activePage: { isAuthenticated:req.isAuthenticated(), fruits: true }, fruits });
};
