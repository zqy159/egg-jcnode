

// const _ = require('lodash');
// const utility = require('utility');
// const validator = require('validator');
const application = require('../extend/application');
const Controller = require('egg').Controller;

class UserController extends Controller {

  async getUserInfo() {
    const { ctx } = this;

    const { user } = ctx.session;

    if (!user) {
      ctx.body = application.responseError({
        message: '用户信息已失效',
      });
      return;
    }
    ctx.body = application.responseSuccess({
      message: '用户信息获取成功',
      data: user,
    });
    return;
  }
}

module.exports = UserController;
