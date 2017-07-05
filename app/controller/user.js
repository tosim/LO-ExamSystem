module.exports = app => {
  class findUser extends app.Controller{
    //post /api/users
    //新建一个资源
    * index(){
      //对象解构，简化赋值，this就是app对象,含有ctx和service
      const {ctx,service} = this;
      const user = yield ctx.service.user.find();
      yield ctx.render('user/user.js', user);
   }
  }

  return findUser;
}