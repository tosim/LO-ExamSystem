module.exports = app => {
  class AboutService extends app.Service {
    * index(){
      return "my msessage prod by service";
    }
  }
  return AboutService;
};