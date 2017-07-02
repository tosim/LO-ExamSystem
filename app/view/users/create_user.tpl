<!-- app/view/news/list.tpl -->
<html>
  <head>
    <title>Create User</title>
  </head>
  <body>
    <form method="post" action="/api/users">
        <!--<input type="hidden" name="_method" value="delete">-->
        姓名<input type="text" name="u_name"><br>
        邮箱<input type="text" name="u_email"><br>
        密码<input type="password" name="u_pass"><br>
        确认密码<input type="password" name="re_password"><br>
        <input type="submit" value="提交">
    </form>
  </body>
</html>