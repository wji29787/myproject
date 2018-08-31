/**
 * api错误名称
 * 
 */

 var ApiErrorNames = {};

 ApiErrorNames.UNKNOW_ERROR='unknowError';
 ApiErrorNames.USER_NOT_EXIST='userNotExist';
 ApiErrorNames.USER_LOGIN_UNKNOW='userLoginUnknow';

 /**
  * 
  * api错误名称对应的错误信息
  * 
  */

  const error_map = new Map();

  error_map.set(ApiErrorNames.UNKNOW_ERROR,{code:-1,message:'未知错误'});
  error_map.set(ApiErrorNames.USER_NOT_EXIST,{code:101,message:'用户不存在'});
  error_map.set(ApiErrorNames.USER_LOGIN_UNKNOW,{code:10002,message:'参数不合法'});

  //根据错误名称获取错误信息

  ApiErrorNames.getErrorInfo = (error_name)=>{
    let error_info;
    if(error_name){
        error_info = error_map.get(error_name);
    }

    //如果没有对应的错误信息,默认‘未知错误’；

    if(!error_info){
        error_name =UNKNOW_ERROR;
        error_info = error_map.get(error_name);
    }
    
    return error_info;
  }

  module.exports = ApiErrorNames;