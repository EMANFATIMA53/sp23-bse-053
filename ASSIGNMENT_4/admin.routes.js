function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_message', 'Please log in first');
    res.redirect('/login');
  }
  
  function isAdmin(req, res, next) {
    if (req.user.role === 'admin') {
      return next();
    }
    req.flash('error_message', 'You do not have permission to access this page');
    res.redirect('/');
  }
  // Admin routes
app.get('/admin', ensureAuthenticated, isAdmin, (req, res) => {
    res.render('admin');
  });

  //flash messages
  req.flash('success_message', 'Your action was successful');
req.flash('error_message', 'Something went wrong');

  