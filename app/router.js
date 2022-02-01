

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  // require('./router/web')(app);
  require('./router/api')(app);
  app.router.redirect('/', '/swagger-ui.html', 302);
};

