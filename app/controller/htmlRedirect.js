'use strict';
const fs = require('fs');
const path = require('path');

module.exports = app => {
  class HomeController extends app.Controller {
    * index() {
        this.ctx.set('Content-Type','text/html;charset:utf-8;')
        this.ctx.body = fs.readFileSync(path.join(app.baseDir, 'public/page/front/front.html'));
    }
  }
  return HomeController;
};
