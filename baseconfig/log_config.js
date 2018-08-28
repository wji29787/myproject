const path = require('path');

//日志根目录

const baseLogPath = path.resolve(__dirname,'../logs');
// console.log(baseLogPath);
//错误日志目录
const errorPath = '/error';
//错误日志文件名
const errorFileName = 'error';

//错误日志输出完整路径
const errorLogPath =path.normalize(baseLogPath + errorPath + "/" + errorFileName);
// const errorLogPath = path.resolve(baseLogPath,errorPath,errorFileName);
// console.log(errorLogPath);
// 错误日志输出路径
//const errorLogPath = path.resolve(__dirname,'../logs/error/error');


//响应日志目录
const responsePath = "/response";
//响应日志文件名
const responseFileName = "response";
//响应日志输出完整路径
const responseLogPath = path.normalize(baseLogPath + responsePath + "/" + responseFileName);

// 响应日志输出路径

//const responseLogPath = path.resolve(__dirname,'../logs/response/response');

 module.exports={
     "appenders":{
         stdout:{
             type:'stdout'
         },
        "errorLogger":{ //错误日志
            "category":"errorLogger",// logger 名称
             "type":"dateFile",// 日志类型
             "filename":errorLogPath,//日志输出位置
             "alwaysIncludePattern":true,// 是否总有后缀名
             "pattern":"-yyyy-MM-dd-hh.log",// 后缀，每小时 创建一个新的日志文件
            //  "path":errorPath
        },
        "resLogger":{ // 响应日志
            "category":"resLogger",// logger 名称
            "type":"dateFile",// 日志类型
            "filename":responseLogPath,//日志输出位置
            "alwaysIncludePattern":true,// 是否总有后缀名
            "pattern":"-yyyy-MM-dd-hh.log",// 后缀，每小时 创建一个新的日志文件
            // "path":responsePath

        }
     },
     categories:{
        default:{appenders:['stdout','resLogger'],level:'debug'},
        errorLogger:{appenders:['errorLogger'],level:'error'},
        resLogger:{appenders:['resLogger'],level:'all'},
     },
    //  "baseLogPath":baseLogPath //logs 根目录
 }

