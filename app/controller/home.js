'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
    * index() {
      // console.log("aaa");
      // this.ctx.body = yield curl('http://127.0.0.1:9001/public/beforelogin.html');
      const home = 'http://127.0.0.1:9001/public/beforelogin.html';
      this.ctx.set('Content-Type','text/html;charset:utf-8;');
      this.ctx.body = `<a href="${home}">home</a>`;
    }
  }
  return HomeController;
};
