

const Loader = require('loader');

module.exports = (options, app) => {
  // assets
  let assets = {};
  const logger = app.logger;

  if (app.config.mini_assets) {
    try {
      assets = require('../assets.json');
    } catch (e) {
      logger.error(
        'You must execute `make build` before start app when mini_assets is true.'
      );
      throw e;
    }
  }

  // 验证用户是否登录
  return async function (ctx, next) {

    // ctx.locals.config = app.config;
    // ctx.locals.Loader = Loader;
    // ctx.locals.assets = assets;
    // ctx.locals.csrf = ctx.csrf;
    const { user } = ctx.session;
    console.log(ctx.request.url);
    if (!user && !ctx.request.url.startsWith('/api/sign/')) {
      ctx.body = {
        code: 11,
        success: false,
        message: '用户信息已失效,请重新登陆！',
      };
      return;
    }
    await next();
  };
};

// app.use(errorPageMiddleware.errorPage);
// _.extend(app.locals, require('./common/render_helper'));
// app.use(function (req, res, next) {
//   res.locals.csrf = req.csrfToken ? req.csrfToken() : '';
//   next();
// });
