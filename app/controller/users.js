module.exports = app => {
  class UserController extends app.Controller{
    //post /api/users
    //新建一个资源
    * create(){
      //对象解构，简化赋值，this就是app对象,含有ctx和service
      const {ctx,service} = this;
      //表单参数验证规则
      const createRule = {
        u_name:'string',
        u_email:'string',
        u_pass:'string',
        re_password:'string'
      };
      //表单参数验证,需要开启egg-validate插件
      ctx.validate(createRule);
      //  调用 service 创建一个 user
      const insertSuccess = yield service.users.create(ctx.request.body);
      // 设置响应体
      ctx.response.body = {
        insertSuccess:insertSuccess
      }
      ctx.response.status = 201;
    }

    //get /api/users
    //获取资源列表
    * index(){
      const {ctx,service} = this;
      const userList = yield service.users.index();
      ctx.response.body = userList;
      ctx.response.status = 200;
    }

    //get /api/users/:id
    //获取单个资源
    * show(){
      const {ctx,service} = this;
      console.log("controller.users.show.id = " + ctx.params.id);
      const user = yield service.users.show(ctx.params.id);
      ctx.response.body = user;
      ctx.response.status = 200;
    }

    //put /api/users/:id
    //更新单个资源
    * update(){
      console.log("接受到put请求");
      const {ctx,service} = this;
      const updateSuccess = yield service.users.update(ctx.params.id,ctx.request.body);
      ctx.response.body = updateSuccess;
      ctx.response.status = 204;
    }

    //del /api/user/:id
    //删除单个资源
    * destroy(){
      const {ctx,service} = this;
      const destroySuccess = yield service.users.destroy(ctx.params.id);
      ctx.response.body = destroySuccess;
      ctx.response.status = 200;
    }
  }
  return UserController;
}