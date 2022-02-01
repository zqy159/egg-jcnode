

const validator = require('validator');
const Controller = require('egg').Controller;
const application = require('../extend/application');
const omit = require('lodash/omit');

class SignController extends Controller {

  validPassword({ phone, password, rePassword }) {
    let message;
    // 验证信息的正确性
    if ([phone, password, rePassword].some(item => {
      return item === '';
    })) {
      message = '信息不完整。';
    } else if (!validator.isMobilePhone(phone, 'zh-CN')) {
      message = '邮箱不合法。';
    } else if (password !== rePassword) {
      message = '两次密码输入不一致。';
    }
    // END 验证信息的正确性
    return message;
  }

  async signup() {
    const { ctx, service } = this;

    const phone = validator.trim(ctx.request.body.phone || '');
    const password = validator.trim(ctx.request.body.password || '');
    const rePassword = validator.trim(ctx.request.body.rePassword || '');
    const name = validator.trim(ctx.request.body.name || '');

    const message = this.validPassword({ phone, password, rePassword, name });

    if (message) {
      ctx.body = application.responseError({
        message,
      });
      return;
    }
    const isUsers = await service.user.getUsersByPhone(phone);
    if (isUsers) {
      ctx.body = application.responseError({
        message: '电话号码已存在',
      });
      return;
    }

    const passhash = ctx.helper.bhash(password);

    // create gravatar
    const avatar = service.user.makeGravatar(phone);
    const newUser = await service.user.createUsers({ phone, password: passhash, avatar, nickname: name });
    if (!newUser) {
      ctx.body = application.responseError({
        message: '用户创建失败',
      });
    }
    ctx.body = application.responseSuccess({
      message: '用户创建成功',
      data: newUser,
    });
    return;
  }

  async login() {
    const { ctx, service } = this;
    const phone = validator.trim(ctx.request.body.phone || '');
    const password = validator.trim(ctx.request.body.password || '');
    if (!phone || !password) {
      ctx.body = application.responseError({
        message: '信息填写有误',
      });
      return;
    }
    const user = await service.user.getUsersByPhone(phone);
    if (!user) {
      ctx.body = application.responseError({
        message: '用户或密码填写错误',
      });
      return;
    }

    const userPassword = user.password;
    const cmpare = ctx.helper.bcompare(password, userPassword);
    if (!cmpare) {
      ctx.body = application.responseError({
        message: '密码填写错误',
      });
      return;
    }
    const userInfo = omit(Object.assign({}, user.dataValues), ['password']);
    ctx.session.user = userInfo;
    ctx.body = application.responseSuccess({
      message: '用户登陆成功',
      data: userInfo,
    });
    return;
  }

  async signout() {
    const { ctx } = this;
    ctx.session = null;
    ctx.body = application.responseSuccess({
      message: '用户登出',
    });
    // ctx.logout();
    // ctx.redirect('/');
    // ctx.body = application.responseSuccess({
    //   message: '用户登出',
    // });
  }

  async resetPassword() {
    const { ctx, service } = this;
    const phone = validator.trim(ctx.request.body.phone || '');
    const password = validator.trim(ctx.request.body.password || '');
    const rePassword = validator.trim(ctx.request.body.rePassword || '');

    const message = this.validPassword({ phone, password, rePassword });

    if (message) {
      ctx.body = application.responseError({
        message,
      });
      return;
    }
    const passhash = ctx.helper.bhash(password);
    const user = await service.user.updatePassword({ phone, password: passhash });

    if (!user) {
      ctx.body = application.responseError({
        message: '密码修改失败',
      });
    }
    ctx.body = application.responseSuccess({
      message: '密码修改成功',
    });
    return;
  }
}

module.exports = SignController;
