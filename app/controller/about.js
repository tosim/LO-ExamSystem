module.exports = app => {
  class UserController extends app.Controller{
    //post /api/users
    //新建一个资源
    * index(){
      //对象解构，简化赋值，this就是app对象,含有ctx和service
      const {ctx,service} = this;
      const message = yield service.about.index();
      yield ctx.render('about/about.js', {message:message});
   }
  }

  return UserController;
}