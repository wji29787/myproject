const Koa = require('koa');
const path = require('path');
const util = require('util');
const jwt = require('jsonwebtoken');
const jwtKoa = require('koa-jwt');
const verify = util.promisify(jwt.verify);// 解密
const secret = 'jwt demo';
//解析提交的表单信息
const bodyParser =require('koa-bodyparser')
// 路由 
const router =require('koa-router')();
// 配置静态资源 目录为 public
const views =require('koa-views');
// 配置静态资源 目录为 static
const staticCache=require('koa-static-cache');
// 日志工具 输出日志
const logUtil =require('./utils/log_util');
//代理转发中间件
const proxy = require('koa-server-http-proxy')
// const koaProxy= require('koa2-proxy');
const app=new Koa();

// koaProxy.static(path.join(__dirname,'./dist'));
// koaProxy.static(__dirname+'/dist/pages/');
// koaProxy.static(__dirname+'/dist/');
// module.exports=koaProxy;
//初始化logger日志文件
// logUtil.initLogPath();
//代理转发中间件
// let cookie=null;
// const options={
//     target:'http://192.168.95.182:8080/cms',
//     pathRewrite:{
//         '^/api':''
//     },
//     changeOrigin: true,
//     onProxyRes(proxyRes,req,res){
//         let oldCookie =proxyRes.headers['set-cookie'];
//         if(oldCookie){
//             cookie=oldCookie;
//         }
//     },
//     onProxyReq(proxyReq,req){
//         if(cookie){
//             proxyReq.setHeader('cookie',cookie);
//         }

//     }
// }


// app.use(proxy('/api',options ));

//缓存 
// app.use(staticCache(path.join(__dirname, './dist/pages'), { dynamic: true }, {
//     maxAge: 365 * 24 * 60 * 60
// }));
// app.use(staticCache(path.join(__dirname,'./dist'),{dynamic:true},{
//     maxAge: 365 * 24 * 60 * 60
// }));

//处理表单中间件
app.use(bodyParser({
    formLimit:'1mb'
}));  

//logger 
// app.use(async (ctx,next) =>{
//     //响应开始时间
//     // console.log(ctx.url,ctx.body);
//     const start = new Date();
//     //响应间隔时间
//     var ms;
//     try {
//         //开始进入到下一个中间件
//         await next();
//         ms = new Date() -start;
//         //记录响应日志
//         logUtil.logResponse(ctx,ms);
//     } catch(error){
//         ms = new Date() - start;
//         //记录异常日志
//         logUtil.logError(ctx,error,ms);
//     } 
// });

//数组中的路径不需要jwt验证
// app.use(jwtKoa({secret}).unless({
//     path:[/^\/api\/users\/login/]
// }));


  //配置服务端模板渲染引擎中间件
// app.use(views(path.join(__dirname,'./dist/pages'),{
//     extension:'html'
// }));


// router.get('/',async (ctx,next)=>{
    
//     await ctx.render('login');
// });
// router.get('/login',async (ctx,next)=>{
  
//     await ctx.render('login');
// });
// router.get('/main',async (ctx,next)=>{
//     await ctx.render('main');
// });
const response_formatter = require('./middlewares/response_formatter');
//添加格式化处理响应结果的中间件，在添加路由之前调用
app.use(response_formatter('^/api'));
const api =require('./routers/api');
router.use('/api',api.routes(),api.allowedMethods());
app.use(router.routes(),router.allowedMethods());


module.exports=app;
// var ss= app.listen('3000','192.168.95.252',()=>{
//      console.log('err');
// }); 
