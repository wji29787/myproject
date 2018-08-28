/**
 * 
 * 在app.use(router)之前调用
 */

 var response_formatter = (ctx) => {
    
     //如果有返回数据，将返回数据添加到data中

     if(ctx.body){
         ctx.body={
             code:0,
             message:'success',
             data:ctx.body
         }
     }else{
         ctx.body = {
            code:0,
            message:'success'
         }
     }
 }

 let url_filter = (pattern) => {
    return async (ctx,next)=>{
        var reg =new RegExp(pattern);
        //先执行路由
        await next();
        //通过正则的url 进行格式化输出
        if(reg.test(ctx.originalUrl)){
            response_formatter(ctx);
        }
    }
 }

 module.exports = url_filter;