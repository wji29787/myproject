const ApiError =require('../error/ApiError');
const ApiErrorNames =require('../error/ApiErrorNames');

const userModel =require('../../lib/mysql');
const md5 =require('md5');
const jwt =require('jsonwebtoken');
const secret = 'jwt demo';
//获取用户
exports.getUser=async (ctx,next)=>{
    //如果id !=1 抛出Api 异常
    if(ctx.query.id !=1){
        throw new ApiError(ApiErrorNames.USER_NOT_EXIST);
    }
    // console.log(ctx.query);
    ctx.cookies.set('aaaa2','dfsfdfff',{
        httpOnly:true,
        path:'/cms'
    })
    ctx.body={
        username:'dsdsdd',
        age:30
    }
}

//用户注册
exports.registerUser = async (ctx,next)=>{
    ctx.body=ctx.request.body;
    // console.log('registerUser',ctx.request.body);
}

//用户登陆

exports.login= async (ctx,next)=>{
    let data =ctx.request.body;
    if(!data.name||!data.password){
        throw new ApiError(ApiErrorNames.USER_LOGIN_UNKNOW);
    }
    await userModel.findDataByName(data.name)
          .then(result =>{
              let res = result;
              if(data.name === res[0]['name'] && md5(data.password)===res[0]['pass']){
                  let token =jwt.sign({
                      name:res[0]['name'],
                      id:res[0]['id']
                  },secret,{expiresIn:'2h'});
                  ctx.body ={
                      data:token
                  }
              }else{
                throw new ApiError(ApiErrorNames.USER_NOT_EXIST);
              }
          })
}