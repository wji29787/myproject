//获取用户
exports.getUser=async (ctx,next)=>{
    ctx.body={
        username:'dsdsdd',
        age:30
    }
}

//用户注册
exports.registerUser = async (ctx,next)=>{
    console.log('registerUser',ctx.request.body);
}