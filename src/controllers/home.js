exports.get = (req, res) => {
  res.render('index', { csrfToken: req.csrfToken(),  activePage: { isAuthenticated:req.isAuthenticated(), home: true , title:'داشبورد'} });
};
