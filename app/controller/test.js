module.exports = app => {
  class TestController extends app.Controller {
    * createUser() {
        const ctx = this.ctx;
        yield ctx.render('users/create_user.tpl');
    }

    // * listUser(){
    //     const ctx = this.ctx;
    //     const UserList = yield ctx.service.user.show();
    //     yield ctx.render('users/list_user.tpl',{list:usersList});
    // }
  }
  return TestController;
};