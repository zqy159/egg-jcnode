

// had enabled by egg
// exports.static = true;

exports.ejs = {
  enable: true,
  package: 'egg-view-ejs',
};

// exports.redis = {
//   enable: true,
//   package: 'egg-redis',
// };

// exports.mongoose = {
//   enable: true,
//   package: 'egg-mongoose',
// };

exports.passport = {
  enable: true,
  package: 'egg-passport',
};

exports.passportGithub = {
  enable: true,
  package: 'egg-passport-github',
};

exports.passportLocal = {
  enable: true,
  package: 'egg-passport-local',
};

// exports.alinode = {
//   enable: true,
//   package: 'egg-alinode',
//   env: [ 'prod' ],
// };

exports.validate = {
  enable: true,
  package: 'egg-validate',
};

exports.routerPlus = {
  enable: true,
  package: 'egg-router-plus',
};

exports.static = true;

// 跨域
exports.cors = {
  enable: true,
  package: 'egg-cors',
};

// swagger文档
exports.swaggerdoc = {
  enable: true,
  package: 'egg-swagger-doc',
};

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

exports.session = {
  key: 'EGG_SESS',
  maxAge: 24 * 3600 * 1000, // 1 天
  httpOnly: true,
  encrypt: true,
};
