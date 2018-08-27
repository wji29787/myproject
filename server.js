const Koa=require('koa');
const path =require('path');
//解析提交的表单信息
const bodyParser =require('koa-bodyparser')
// 路由 
const router =require('koa-router')();
// 配置静态资源 目录为 public
const views =require('koa-views');
// 配置静态资源 目录为 static
const staticCache=require('koa-static-cache');

const app=new Koa();

//缓存 
app.use(staticCache(path.join(__dirname,'./dist'),{dynamic:true},{
    maxAge: 365 * 24 * 60 * 60
}));
app.use(staticCache(path.join(__dirname, './dist/pages'), { dynamic: true }, {
    maxAge: 365 * 24 * 60 * 60
}));

  //配置服务端模板渲染引擎中间件
// app.use(views(path.join(__dirname,'./dist/pages'),{
//     extension:'html'
// }));
app.use(async (ctx,next)=>{
    console.log(ctx.url,ctx.method);
    // if(ctx.url=='/'){
    //     await ctx.render('contentEditing');
    // }
    await next();
});
app.use(bodyParser({
    formLimit:'1mb'
}));  
// router.get('/',async (ctx,next)=>{
//     // console.log(1111);
//     await ctx.render('contentEditing');
// });
// app.use(router.routes());

app.listen('3000','192.168.95.252',()=>{
     console.log('err');
}); 