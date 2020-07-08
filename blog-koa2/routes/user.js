const router = require("koa-router")();
const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");

router.prefix("/api/user");

router.post("/login", async function (ctx, next) {
  console.log(ctx.request.body.loginForm);
  const { username, password } = ctx.request.body.loginForm;
  console.log(username);
  console.log(password);
  const data = await login(username, password);
  if (data.username) {
    // 设置 session
    console.log("111111111111");
    console.log(data.username);
    ctx.session.username = data.username;
    console.log(ctx.session.username);
    ctx.session.realname = data.realname;

    ctx.body = new SuccessModel();
    return;
  }
  ctx.body = new ErrorModel("登录失败");
});

router.get("/session-test", async function (ctx, next) {
  if (ctx.session.viewCount == null) {
    ctx.session.viewCount = 0;
  }
  ctx.session.viewCount++;

  ctx.body = {
    errno: 0,
    viewCount: ctx.session.viewCount,
  };
});

module.exports = router;
