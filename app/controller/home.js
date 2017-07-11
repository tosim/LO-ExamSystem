'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
    * index() {
      // this.ctx.body = 'hi, egg';
      this.ctx.redirect('/public/index.html#/test');
    }
  }
  return HomeController;
};
