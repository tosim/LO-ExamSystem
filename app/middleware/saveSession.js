//options在config里配置exports.middlewarename = ...
//app是application实例

//在config里面引入中间件exports.middleware=['saveSession'];
module.exports = (options,app) => {
  return function* (next) {
    yield next;
    // 如果 Session 是空的，则不保存
    if (!this.session.populated) return;
    this.session.save();
    // console.log(this.session);
  };
};