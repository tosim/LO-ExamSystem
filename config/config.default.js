'use strict';

module.exports = appInfo => {
  const config = {};

  // should change to your own
  config.keys = appInfo.name + '_1498971103875_1650';

  // add your config here
  
  config.mysql = {
    // 单数据库信息配置
    client: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: '056210',
      database: 'eggmysql',    
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false
  };

  // 添加 view 配置
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

  // add middleware
  config.middleware = [
    'errorHandler'
  ];

  //错误处理的中间件
  config.errorHandler = {
      match: '/api',
  };

  return config;
};





