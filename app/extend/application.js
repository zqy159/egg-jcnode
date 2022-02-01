'use strict';

// 扩展一些框架便利的方法
module.exports = {
  responseSuccess: ({ message = '请求成功', code = 0, data }) => {
    return {
      message,
      code,
      data,
    };
  },
  responseError: ({ message = '请求失败', code = -1, data }) => {
    return {
      message,
      code,
      data,
    };
  },
};
