
const path = require('path');

module.exports = appInfo => {
  const config = {};

  config.name = 'CNode技术社区';

  config.description = 'CNode：Node.js专业中文社区';

  config.site_logo = '/public/images/cnodejs_light.svg';

  config.site_icon = '/public/images/cnode_icon_32.png';

  // debug 为 true 时，用于本地调试
  config.debug = true;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1519887194138_3450';

  config.host = 'http://cnodejs.org';

  config.session_secret = 'node_club_secret'; // 务必修改

  // add your config here
  config.middleware = [
    'locals',
    'authUser',
    'blockUser',
    'errorPage',
    'errorHandler',
  ];

  config.authUser = {
    enable: true,
    match: '/',
  };

  // 是否允许直接注册（否则只能走 github 的方式）
  config.allow_sign_up = true;

  // cdn host，如 http://cnodejs.qiniudn.com
  // config.site_static_host = process.env.EGG_SITE_STATIC_HOST || ''; // 静态文件存储域名
  config.static = {
    // 静态化访问前缀,如：`http://127.0.0.1:7001/static/images/logo.png`
    prefix: '/static',
    dir: path.join(appInfo.baseDir, 'app/public'), // `String` or `Array:[dir1, dir2, ...]` 静态化目录,可以设置多个静态化目录
    dynamic: true, // 如果当前访问的静态资源没有缓存，则缓存静态文件，和`preload`配合使用；
    preload: false,
    maxAge: 31536000, // in prod env, 0 in other envs
    buffer: true, // in prod env, false in other envs
  };
  config.mini_assets = process.env.EGG_MINI_ASSETS || false;

  // 版块
  config.tabs = [
    ['share', '分享'],
    ['ask', '问答'],
    ['job', '招聘'],
  ];

  // RSS配置
  config.rss = {
    title: 'CNode：Node.js专业中文社区',
    link: 'http://cnodejs.org',
    language: 'zh-cn',
    description: 'CNode：Node.js专业中文社区',
    // 最多获取的RSS Item数量
    max_rss_items: 50,
  };

  // 下面两个配置都是文件上传的配置

  // 7牛的access信息，用于文件上传
  config.qn_access = {
    accessKey: 'your access key',
    secretKey: 'your secret key',
    bucket: 'your bucket name',
    origin: 'http://your qiniu domain',
    // 如果vps在国外，请使用 http://up.qiniug.com/ ，这是七牛的国际节点
    // 如果在国内，此项请留空
    uploadURL: 'http://xxxxxxxx',
  };

  // 文件上传配置
  // 注：如果填写 qn_access，则会上传到 7牛，以下配置无效
  config.upload = {
    path: path.join(__dirname, '../app/public/upload/'),
    url: '/public/upload/',
  };

  config.view = {
    defaultViewEngine: 'ejs',
    mapping: {
      '.html': 'ejs',
    },
  };

  config.ejs = {
    layout: 'layout.html',
  };

  config.avatars_allow_hostname = [
    'avatars0.githubusercontent.com',
    'avatars1.githubusercontent.com',
    'avatars2.githubusercontent.com',
    'avatars.githubusercontent.com',
    'www.gravatar.com',
    'gravatar.com',
    'www.google-analytics.com',
  ];

  config.auth_cookie_name = 'node_club';
  config.admins = {
    ADMIN_USER: true,
  };

  config.siteFile = {
    '/favicon.ico': '/public/images/cnode_icon_32.png',
  };

  // database
  config.redis = {
    client: {
      host: process.env.EGG_REDIS_HOST || '127.0.0.1',
      port: process.env.EGG_REDIS_PORT || 6379,
      password: process.env.EGG_REDIS_PASSWORD || '',
      db: process.env.EGG_REDIS_DB || '0',
    },
  };

  exports.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'root@1234!',
      // 数据库名
      database: 'db_juchuang_platform',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  /**
                     * @see http://mongodb.github.io/node-mongodb-native/2.2/api/Db.html#createCollection
                     */
  config.mongoose = {
    // baseDir: 'model/mongo',
    url: process.env.EGG_MONGODB_URL || 'mongodb://127.0.0.1:27017/egg_cnode',
    options: {
      server: { poolSize: 20 },
      reconnectTries: 10,
      reconnectInterval: 500,
    },
  };

  // passport
  config.passportGithub = {
    key: process.env.EGG_PASSPORT_GITHUB_CLIENT_ID || 'test',
    secret: process.env.EGG_PASSPORT_GITHUB_CLIENT_SECRET || 'test',
  };

  config.passportLocal = {
    usernameField: 'name',
    passwordField: 'pass',
  };

  // 邮箱配置
  config.mail_opts = {
    host: 'smtp.126.com',
    port: 25,
    auth: {
      user: 'club@126.com',
      pass: 'club',
    },
    ignoreTLS: true,
  };

  config.alinode = {
    // 从 `Node.js 性能平台` 获取对应的接入参数
    appid: process.env.EGG_ALINODE_APPID || '',
    secret: process.env.EGG_ALINODE_SECRET || '',
  };

  config.topic = {
    perDayPerUserLimitCount: 10,
  };

  config.list_topic_count = 20;

  // 每个 IP 每天可创建用户数
  config.create_user_per_ip = 1000;

  config.search = 'google'; // 'google', 'baidu', 'local'

  config.security = {
    csrf: {
      ignore: '/api/*/*',
    },
  };

  config.default_page = 1;
  config.default_limit = 20;


  // 后增配置


  // 安全配置
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: ['*'],
  };

  // 跨域配置
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };
  config.multipart = {
    mode: 'file',
    fields: 50, // 表单上传字段限制的个数
    fileSize: '100mb', // 文件上传的大小限制
  };

  // swagger文档配置
  config.swaggerdoc = {
    dirScanner: './app/controller', // 插件扫描的文档路径
    apiInfo: {
      title: 'swagger文档',
      description: 'egg.js swagger-demo文档',
      version: '1.0.0',
    },
    consumes: ['application/json', 'multipart/form-data'], // 指定处理请求的提交内容类型（Content-Type），例如application/json, text/html
    produces: ['application/json', 'multipart/form-data'], // 指定返回的内容类型，仅当request请求头中的(Accept)类型中包含该指定类型才返回
    schemes: ['http', 'https'],
    routerMap: true, // 是否自动生成route
    enable: true,
  };

  config.sequelize = {
    datasources: [{
      delegate: 'modelmysql',
      baseDir: 'modelmysql',
      dialect: 'mysql', // 数据库类型，支持 mysql，sqlite,mssql,pgsql,oracle。
      host: '1.14.248.76', // 数据库服务器地址。
      // host: '127.0.0.1',
      port: 3306, // 数据库连接端口号。
      database: 'db_juchuang_platform', // 数据库名称。
      username: 'root', // 数据库登录用户名。
      password: 'Qwer@1234', // 数据库登录密码。
      timezone: '+08:00', // 时区 东八区
      underscored: true, // 是否自动进行下划线转换（这里是因为DB默认的命名规则是下划线方式，而我们使用的大多数是驼峰方式）
      define: {
        freezeTableName: true, // Model 对应的表名将与model名相同。
        timestamps: true, // 默认情况下，Sequelize会将createdAt和updatedAt的属性添加到模型中，以便您可以知道数据库条目何时进入数据库以及何时被更新。
      },
      dialectOptions: {
        dateStrings: true,
        typeCast(field, next) {
          if (field.type === 'TIME') {
            return new Date(field.string()).valueOf();
          }
          return next();
        },
      },
    },
    ],
  };
  return config;
};

