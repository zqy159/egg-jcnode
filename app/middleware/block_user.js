'use strict';

module.exports = () => {
  return async function blockUser(ctx, next) {
    if (ctx.path === '/signout') {
      await next();
      return;
    }
    console.log(ctx.user, 'block_user');
    if (ctx.user && ctx.user.is_block && ctx.method !== 'GET') {
      ctx.status = 403;
      ctx.body = '您已被管理员屏蔽了。有疑问请联系 @alsotang。';
      return;
    }

    await next();
  };
};
