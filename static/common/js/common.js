/*公共js*/
//改变rem
$(function() {
    var sessionVal = false;
    var sessionObject = new Object();
    if($("#userPermissions").val()==0) {
        $(".header-box").addClass("on");
        webscoket();
        search();

    }else{
        $(".header-userinfo-address").css("visibility","hidden");
    }
})

;
(function (win, doc) {
    var rem = 100 * doc.documentElement.clientWidth / 1920;
    doc.documentElement.style.fontSize = rem + 'px';
    win.onresize = function () {
        rem = 100 * doc.documentElement.clientWidth / 1920;
        doc.documentElement.style.fontSize = rem + 'px';
    };
})(window, document);
/**
 * ajax默认设置
 * 包括默认提交方式为POST，
 * 判断后台是否是重定向
 */
$.ajaxSetup( {    
    //设置ajax请求结束后的执行动作    
    complete : function(XMLHttpRequest, textStatus) {  
        // 通过XMLHttpRequest取得响应头，REDIRECT  
        var responseJSON = XMLHttpRequest.responseJSON;//若HEADER中含有REDIRECT说明后端想重定向
        //alert(redirectResult);
        if (responseJSON) {
			try {
				if(responseJSON.logon_error){
					var win = window;
					while (win != win.top) {
						win = win.top;
					}
					//将后端重定向的地址取出来,使用win.location.href去实现重定向的要求  
					win.location.href = (responseJSON.redirectUrl) ? responseJSON.redirectUrl : home_path;
				}
			} catch (err) {
				console.log("ajaxSetup-----err--" + err);
			}
		}
	},
	type : 'POST'
});


/*
 * author:"王肖"， introduce;'运维管理左侧下三个子页面三个导航，含子导航数据传入组件序号，组件字段message,例子：<
 * nav-operation
 * message='1'></nav-operation 组件根据传入数字，给其相应导航添加 active 类 '
 */
Vue.component(
    'nav-operation',
    {
        props: ['message','addressbook'],
        mounted: function ()// 初始化控制active
        {
          if(!this.addressbook){
              if(this.message==6){
                  this.num=5;
              }
              this.pathUrl.splice(4,1);
          }
        },
        template:'<ul class="nav-level-one"><li v-for="(item,$index) in pathUrl" :class="{\'active\':num==($index+1)}"><a href="javascript:;" @click="fnRedirect(item,$index)"><i class="fl iconfont" :class="item.currentClass"></i>{{item.text}}</a></li></ul>',
        data: function () {
            return {
                    num:this.message,
                    pathUrl:[{url:'operationManagement/deviceManagement/deviceManagement.do',
                        currentClass:'icon-odevice icon-bijibendiannao',
                        text:"设备管理",
                    },
                    {url:'operationManagement/logManagement/logManagement.do',
                        currentClass:'icon-rizhi',
                        text:"日志管理",
                    },
                    {url:'operationManagement/systemConfiguration/systemConfiguration.do',
                        currentClass:'icon-xitongpeizhi',
                        text:"系统配置",
                    },
                    {url:'operationManagement/systemConfiguration/getCascadeManagement.do',
                        currentClass:'icon-cascader',
                        text:"级联管理",
                    },
                    {url:'addressBook/addressBook/getAddressBookList.do',
                        currentClass:'icon-yonghu',
                        text:"通讯录",
                    },
                    {url:'main/serviceState.do?flag=1',
                        currentClass:'service-state icon-yonghu',
                        text:"服务状态",
                    }],
                  
            };
        },
        methods: {
            fnRedirect: function (list,num)// 重定向页面
            {   
                if((num+1)==this.num){
                    return;
                } 
                window.location = home_path + list.url;
            }
        }
    });
/*
 * author:"李福旭"， introduce;'个人资源左侧下三个子页面三个导航，含子导航数据传入组件序号，组件字段message,例子：<nav-operation
 * message='1'></nav-operation 组件根据传入数字，给其相应导航添加 active 类 '
 */
Vue.component(
    'nav-personal',
    {
        props: ['message'],
        mounted: function () {
            
        },
        template: '<ul class="nav-level-one">'+
                  '<li :class="{\'active\':message==1}"><a href="javascript:;" @click="redirect(1)" ><i class="fl iconfont icon-luxiangxian" ></i>实时录制</a></li>'+
                  '<li :class="{\'active\':message==2}"><a href="javascript:;" @click="redirect(2)"><i class="fl iconfont icon-shishizhuanma"></i>实时转码</a></li>'+
                  '<li :class="{\'active\':message==3}"><a href="javascript:;" @click="redirect(3)"><i class="fl iconfont icon-folderwenjianjia"></i>媒体文件</a></li>'+
                  '<li :class="{\'active\':message==4}"><a href="javascript:;" @click="redirect(4)"><i class="fl iconfont icon-iconfontshanchu"></i>回收站</a></li>'+
                  '</ul>',
        data: function () {
            return {
                pathUrl:[{url:'personalResources/recordingTask/realTimeRecording.do'
                },{url:'personalResources/videoResource/transcoding.do'
                },{url:'personalResources/videoResource/mediaFile.do'
                },{url:'personalResources/recoveryResources/recycleBin.do'
                }],
            };
        },
        methods: {
            redirect: function (num) {
                if(this.message==num){
                    return;
                }
                window.location = home_path + this.pathUrl[num-1].url;
            }
        }
    });
/** 用户权限过滤器* */
Vue.filter('permissions-filter', function (value) {
    var text;
    if (!value) {
        text = "";
    }
    switch (value) {
        case 0:
            text = "超级管理员";
            break;
        case 1:
            text = "管理员";
            break;
        case 2:
            text = "普通用户";
            break;
    }
    ;
    return text;
});
/** 自定义filter名称为'time'---转化时间过滤器* */
Vue.filter('time',
    /* value 格式为13位unix时间戳 */
    /* 10位unix时间戳可通过value*1000转换为13位格式 */
    function (value) {
        return timeYmdHms(value);
    });

/** 把秒转换成 00:00:00时间格式 筛选器* */
Vue.filter('stime', function (value) {
    return timeHms(value);
});
/***转换文件大小（filesize）默认kb转化为MB***/
Vue.filter('fileSize',function (value) {
    return videoFileSize(value);
});

/* 时间转换成年月日时分秒 */
function timeYmdHms(value) {

    if (!value) {
        return '';
    }

    var date = new Date(value);
    Y = date.getFullYear(), m = date.getMonth() + 1, d = date.getDate(),
        H = date.getHours(), i = date.getMinutes(), s = date.getSeconds();
    if (m < 10) {
        m = '0' + m;
    }
    if (d < 10) {
        d = '0' + d;
    }
    if (H < 10) {
        H = '0' + H;
    }
    if (i < 10) {
        i = '0' + i;
    }
    if (s < 10) {
        s = '0' + s;
    }
    var t = Y + '-' + m + '-' + d + ' ' + H + ':' + i + ':' + s;
    /* var t = Y + '-' + m + '-' + d; 年月日 */
    return t;
};
var ajaxdata = function (_data, callback, async) {

    if (!ajaxdata.obj) {
        ajaxdata.obj = {};
    }

    var _str = JSON.stringify(_data);
    if (ajaxdata.obj[_str]) {
        return;
    } else {
        ajaxdata.obj[_str] = _str;
    }

    $.ajax({
        type: "POST",
        url: _data.action,
        data: _data.data,
        async: async ? false : true, //异步为true，同步false
        dataType: "json",
        success: function (data) {
            if(!isLogonError(data)){
                return ;
            }
            callback(data.result, data);
            ajaxdata.obj[_str] = null;
        },
        error: function (xhr, type, exception) {
            callback('-404', JSON.stringify(xhr));
            ajaxdata.obj[_str] = null;
        }
    });
};
//获取区域列表
var getArea=function (pid, level, _selected) {
    console.log(_selected)
    // var _this = this,
    var   sendData = {
        action: 'locationPosition/info/getRegionList.do',
        data: {"pid":pid},
        async: false
    };
    if(pid==="0") return;
    ajaxdata(sendData, function (result, data) {
        //console.log(level);
        if (result) {
            switch (level) {
                case 0: //省
                    appendHtml($('.getSheng'),data.data);
                    break;
                case 1://市
                    appendHtml($('.getShi'),data.data);
                    break;
                case 2://县
                    appendHtml($('.getXian'),data.data);
                    break;
                case 3://乡
                    appendHtml($('.getXiang'),data.data);
                    break;
            }
        } else {
            // _this.userConfig.userable = 0;//查询失败时，禁用选择框
            layer.msg(data.msg);
        }
        function appendHtml(elem,_data){
            _data.forEach(function(item){

                if(_selected&&item.id==_selected){
                    elem.append('<option value='+item.id+' selected>'+item.name+'</option>');
                }else {
                    elem.append('<option value='+item.id+'>'+item.name+'</option>');
                }

            });
        }
    });
};
// 把字符串拼接的时间格式改为时分秒--时长
function timeHms(val) {
    var _txt = '';
    if (!val) {
        return "00:00:00";
    }

    var _h = addZero(parseInt(val / 3600)), _m = addZero(parseInt(val % 3600 / 60)), _s = addZero(val % 60);

    _txt = _h + ':' + _m + ':' + _s;

    return _txt;
}

// 补零函数
function addZero(_v) {
    return _v > 9 ? _v : '0' + _v;
}

// 把字符串拼接的undefind换成''或者0
function returnEmpty(val) {
    if (val === 0 || val === '0') {
        return 0;
    } else if (!val) {
        return '';
    } else {
        if (val == 'null' || val == 'undefined') {
            return '';
        } else {
            return val;
        }
    }
}

// 空值返回0
function returnZero(val) {
    if (!val) {
        return 0;
    }
    return val;
}

// 数组通过某一属性排序参数为属性名，返回数据
function arrSort(property) {
    return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    };
}

/**
 * 判断浏览器类型
 *
 * @returns {String}
 */
function getBrowserType() {
    var userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    // 判断是否Opera浏览器
    if (isOpera) {
        return "Opera";
    } else if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } else if (userAgent.indexOf("Chrome") > -1) {// 判断是否Firefox浏览器
        return "Chrome";
    } else if (userAgent.indexOf("Safari") > -1) {// 判断是否Safari浏览器
        return "Safari";
    } else if (userAgent.indexOf("compatible") > -1
        && userAgent.indexOf("MSIE") > -1 && !isOpera) {// 判断是否IE浏览器
        return "IE";
    } else {
        return "IE";
    }

}

function fullScreen() { // 全屏方法
    var el = document.documentElement;
    var rfs = el.requestFullScreen || el.webkitRequestFullScreen
        || el.mozRequestFullScreen || el.msRequestFullScreen;
    if (typeof rfs != "undefined" && rfs) {
        rfs.call(el);
    } else if (typeof window.ActiveXObject != "undefined") {
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null) {
            wscript.SendKeys("{F11}");
        }
    }
}

function exitFullScreen() { // 退出全屏方法
    var el = document, cfs = el.cancelFullScreen || el.webkitCancelFullScreen
        || el.mozCancelFullScreen || el.exitFullScreen, wscript;

    if (typeof cfs != "undefined" && cfs) {
        cfs.call(el);
        return;
    }

    if (typeof window.ActiveXObject != "undefined") {
        wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null) {
            wscript.SendKeys("{F11}");
        }
    }
}

// 转化硬盘容量 默认传过来的为Mb
function diskSize(value) {
    if (!value) {
        return 0;
    } else {
        if(value<1024){
            return value+"MB";
        }else{
            var _size = value / 1024; // G
            if (_size >= 1024) {
                var t=parseInt(_size / 1024)+(_size % 1024 / 1024);
                return parseInt(t*100)/100 + 'T';
            } else {
                return parseInt(_size*100)/100 + 'G';
            }
        }
        
    }
}


// 文件大小,单位为kb   videoFileSize
function videoFileSize(value) {
    if (!value) {
        return 0;
    } else {
        var _sizeMb = parseInt(value / 1024); // mb
        if (_sizeMb >= 1024) {
            var _sizeG = parseInt(_sizeMb / 1024);
            if (_sizeG >= 1024) {
                var tb=parseInt(_sizeG / 1024)+(_sizeG % 1024 / 1024);
                return  parseInt(tb*100)/100+ 'TB';
            } else {
                _sizeG+=_sizeMb % 1024 / 1024;
                return parseInt(_sizeG*100)/100 + 'GB';
            }
        } else {
            if(_sizeMb >0){
                return parseInt((_sizeMb+value % 1024/1024)*100)/100+'MB';
            }else {
                return parseInt(value*100)/100 + 'KB';
            }
        }
    }
}

// 码率转换 
function rateNum(value) {
    if (!value) {
        return 0;
    } else {
        var _sizeKb = parseInt(value / 1000);
        if (_sizeKb >= 1000) {
            var _sizeMb = parseInt(_sizeKb / 1000);
            return (_sizeMb + ((_sizeMb % 1000 / 1000).toFixed(2) - 0)) + 'Mb/s';
        } else if (_sizeKb < 1000 && _sizeKb >= 1) {
            return (_sizeKb + ((value % 1000 / 1000).toFixed(2) - 0)) + 'Kb/s';
        } else {
            return (value % 1000 / 1000).toFixed(2) + 'b/s';
        }
    }
}

//采样率

function samplingRate(value) {
    if (!value) {
        return 0;
    } else {
        return (value / 1000).toFixed(1) + 'khz';
    }
}

/**
 * 文件大小转换函数
 *
 * @param value
 *            num类型，单位为Kb
 */
function fileSize(value) {
    if (!value) {
        return '';
    }
    return value;
}

/**
 * 通过传过来的值进行判断flv格式和mp4格式进行路径拼接
 *
 * @param _ur
 *            string 返回拼接后的正确的路径
 */
function addVideoPath(_url) {
    var _len = _url.length, // 字符的长度
        _in = _url.indexOf('vod/'), // 找到vod/在索引
        _str1 = _url.substring(0, _in + 4), // 截取前面的字符
        _str2 = _url.substring(_in + 4, _len);// 截取后面的字符
    if (_url.lastIndexOf('.flv') == _len - 4) {
        return _str1 + 'flv:' + _str2;
    } else if (_url.lastIndexOf('.mp4') == _len - 4) {
        return _str1 + 'mp4:' + _str2;
    } else {
        return '';
    }
}

/*
 * 补零函数
 */
function add0(m) {
    return m < 10 ? '0' + m : m;
}

/*
 * 根据时间戳转换成具体时间
 */
function format(timestamp) {
    // timestamp是整数，否则要parseInt转换,不会出现少个0的情况

    var time = new Date(timestamp);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var date = time.getDate();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    return year + '-' + add0(month) + '-' + add0(date) + ' ' + add0(hours) + ':' + add0(minutes) + ':' + add0(seconds);
}

/*******************************************************************************
 * 毫秒数转为时:分:秒
 *
 * @param value
 *            毫秒数
 * @returns 格式化后的时间
 */
function formatSeconds(value) {
    var theTime = parseInt(value); // 秒
    var theTime1 = 0; // 分
    var theTime2 = 0; // 小时
    // alert(theTime);
    if (theTime >= 60) {
        theTime1 = parseInt(theTime / 60);
        theTime = parseInt(theTime % 60);
        // alert(theTime1+"-"+theTime);
        if (theTime1 >= 60) {
            theTime2 = parseInt(theTime1 / 60);
            theTime1 = parseInt(theTime1 % 60);
        }
    }
    // 秒
    var second = parseInt(theTime) == 0 ? ":00"
        : (parseInt(theTime) + "").length == 1 ? ":0" + parseInt(theTime)
            : ":" + parseInt(theTime);
    // 分钟
    var minute = parseInt(theTime1) == 0 ? ":00"
        : (parseInt(theTime1) + "").length == 1 ? ":0" + parseInt(theTime1)
            : ":" + parseInt(theTime1);
    // 小时
    var hour = parseInt(theTime2) == 0 ? "00"
        : (parseInt(theTime2) + "").length == 1 ? "0" + parseInt(theTime2)
            : parseInt(theTime2);
    var result = hour + minute + second;
    return result;
}

// 补零函数
function toDou(iNum) {
    return iNum < 10 ? '0' + iNum : '' + iNum;
}

// 把秒转换成 00:00：00时间格式
function getT(t) {
    var h = Math.floor(t / 3600);
    t = Math.floor(t % 3600);
    var m = Math.floor(t / 60);
    var s = Math.floor(t % 60);
    return toDou(h) + ':' + toDou(m) + ':' + toDou(s);
}

//过滤所有input输入时的字符，去除特殊字符以及空格
function filterChara(target) {
    var ref = /[\s""“”''‘’。\?？\*\$%<>《》]/g;
    var strval = target.value;
    if (ref.test(strval)) {
        target.value = strval.replace(/[\s""“”''‘’。\?？\*\$%<>《》]/g, '');
        layer.msg('您输入的内容包含特殊字符，已帮您自动过滤！');
    }

}

//搜索input提交时进行字符串处理
function formatStringInSubmit(val) {
    var _aVal = val.split(' ');
    for (var i = 0; i < _aVal.length; i++) {
        if (!_aVal[i]) {
            /*if(_aVal[i]==_aVal[i+1]){
                _aVal.splice(i,1);
                i--;
            }*/
            _aVal.splice(i, 1);
            i--;
        }
    }
    return _aVal.join(' ');
}

/**
 *
 * 判断当前操作系统
 *
 */
function systemType() {
    var _platForm = navigator.platform;
    var _userAgent = navigator.userAgent;

    if (_platForm == 'Win32' || _platForm == 'Windows') {

        var sNT = _userAgent.substr(_userAgent.indexOf("Windows NT ") + 11, 3);

        switch (sNT) {
            case '5.0':
                return 'Win2000';
                break;
            case '5.1':
                return 'Windows XP';
                break;
            case '5.2':
                return 'Windows 2003';
                break;
            case '6.0':
                return 'WindowsVista';
                break;
            case '6.1':
                return 'Windows7';
                break;
            case '6.2':
                return 'Windows8';
                break;
            case '10.0':
                return 'Windows10';
                break;
        }
        if (_userAgent.indexOf('Windows NT 10.0') != -1) {
            return 'Windows10';
        } else {
            return '未知Windows系统';
        }
    } else if (_platForm == 'Mac68K' || _platForm == 'MacPPC'
        || _platForm == 'Macintosh' || _platForm == 'MacIntel') {
        return 'Mac';
    } else if (_platForm.indexOf("Linux") != -1) {
        return 'Linux';
    } else if (_platForm == 'X11') {
        return 'Unix';
    } else {
        return '未知系统';
    }
}

// 视频正在播放接口
function videoStartPlay(data) {
    var _type = '';

    switch (data.type) {
        case 1:
            _type = '实时录制';
            break;
        case 2:
            _type = '媒体文件';
            break;
        case 3:
            _type = '云端资源';
            break;
        case 4:
            _type = '微信点播';
            break;
        default:
            _type = "未知模块";
            break;
    }

    $.ajax({
        url: "main/resourcePlayHistory/playStart.do",
        type: "POST",
        data: {
            "OS": systemType(),
            "fromType": _type,
            "resourceName": data.resName,
            "resourceUrl": data.resUrl,
            "resourceId": data.resId,
            "userAgent": navigator.userAgent
        },
        dataType: "JSON"
    });
}

// 视频结束播放接口
function videoStopPlay(data) {
    var _type = '';
    switch (data.type) {
        case 1:
            _type = '实时录制';
            break;
        case 2:
            _type = '媒体文件';
            break;
        case 3:
            _type = '云端资源';
            break;
        case 4:
            _type = '微信点播';
            break;
        default:
            _type = '未知来源';
            break;
    }
    $.ajax({
        url: "main/resourcePlayHistory/playEnd.do",
        type: "POST",
        data: {
            "OS": systemType(),
            "fromType": _type,
            "resourceName": data.resName,
            "resourceUrl": data.resUrl,
            "resourceId": data.resId,
            "userAgent": navigator.userAgent
        },
        dataType: "JSON"
    });
};
//测试用 视频打开时
function getTimerVideo(data){
    var _type = '';
    switch (data.type) {
        case 1:
            _type = '实时录制';
            break;
        case 2:
            _type = '媒体文件';
            break;
        case 3:
            _type = '云端资源';
            break;
        case 4:
            _type = '微信点播';
            break;
        default:
            _type = '未知来源';
            break;
    }
    $.ajax({
        url:data.sendUrl,
        type: "POST",
        data: {
            "OS": systemType(),
            "fromType": _type,
            "resourceName": data.resName,
            "resourceUrl": data.resUrl,
            "resourceId": data.resId,
            "userAgent": navigator.userAgent
        },
        dataType: "JSON"
    });
};
/** **用户注销事件** */
function userExit() {

    $.post(
        'userManagement/logout.do',
        function (data) {
            if (data.result) {
                localStorage.removeItem("downClose");
                localStorage.removeItem("user");
                layer.msg(data.msg);
            } else {
                layer.msg(data.msg);
            }
            if (data.logon_error) {
                window.location.href = "userManagement/login.do";
            }
            window.location.href = "userManagement/login.do";
        }, function (data) {
            layer.msg(data.msg);
        },
        'JSON'
    );
}


//更新所属地域
function addAdress() {
    //$(".header-box").addClass("on");
    var _this = this;
    //查询
    $.ajax({
        type:"POST",
        url:"locationPosition/info/getList.do",//查询
        dataType:"JSON",
        success:function (Data) {
            console.log(Data.data[0].address)
            if(Data.result) {
                //layer.msg(Data.msg);
                var ID = Data.data[0].regionId;
                var regionIds = Data.data[0].regionIds;//市区县ID

                var _str = '<div class="zlayer-wrap address-add" style="display:block;">' +
                    '<div class="zlayer-box"><div class="zlayer-top"><span class="zlayer-txt">所属区域</span> <h3 class="zlayer-title"></h3> <i class="zlayer-close iconfont icon-guanbi"></i></div>' +
                    '<div class="address-add-item">' +
                    '<label><span>*</span>IP地址：</label>' +
                    '<input id="add_ip" type="text" placeholder="请输入IP地址" maxlength="50" value="'+Data.data[0].ip+'" />' +
                    '</div>' +
                    '<div class="address-add-item">';
                _str+='<label><span>*</span>端口：</label>';
                if(Data.data[0].port == null) {
                    _str+='<input id="add_port" type="text" placeholder="请输入端口" maxlength="50" value="" />';
                }else{
                    _str+='<input id="add_port" type="text" placeholder="请输入端口" maxlength="50" value="'+Data.data[0].port+'" />';
                }
                _str+='</div>' +
                    '<div class="address-add-item">' +
                    '<label><span>*</span>所属区域：</label>'+
                    '<div class="select_adress">';

                _str+='<select id="select_city" class="getSheng"><option value="0">省</option></select>'+
                    '<select id="city" class="getShi"><option value="0">市</option></select>'+
                    '<select id="area" class="getXian"><option value="0">县</option></select>'+
                    '<select id="country" class="getXiang"><option value="0">乡</option></select>'+
                    '</div></div>'+
                    '<div class="address-add-item">' +
                    '<label>具体地址：</label>';
                if(Data.data[0].address == null) {
                    _str+='<input id="add_places" type="text" placeholder="请输入具体地址" maxlength="70" value="" />';
                }else{
                    _str+='<input id="add_places" type="text" placeholder="请输入具体地址" maxlength="70" value="'+Data.data[0].address+'" />';
                }
                _str+= '</div>' +
                    '<div class="address-add-item">' +
                    '<label>经度：</label>';
                if(Data.data[0].longitude == null) {
                    _str+='<input id="add_longitude" type="text" placeholder="请输入经度" maxlength="70" value="" />';
                }else{
                    _str+='<input id="add_longitude" type="text" placeholder="请输入经度" maxlength="70" value="'+Data.data[0].longitude+'" />';
                }
                _str+='</div>' +
                    '<div class="address-add-item">' +
                    '<label>纬度：</label>';
                if(Data.data[0].latitude == null) {
                    _str+='<input id="add_latitude" type="text" placeholder="请输入纬度" maxlength="50" value="" />';
                }else{
                    _str+='<input id="add_latitude" type="text" placeholder="请输入纬度" maxlength="50" value="'+Data.data[0].latitude+'" />';
                }

                _str+='</div>' +
                    '<div class="address-add-item">' +
                    '<label>负责人姓名：</label>';
                _str+= '<input id="add_personName" type="text" placeholder="请输入负责人姓名" maxlength="50" value="'+Data.data[0].leader+'" />';
                _str+='</div>' +
                    '<div class="address-add-item">' +
                    '<label><span>*</span>负责人电话：</label>' +
                    '<input id="add_personPhone" type="text" placeholder="请输入负责人电话" maxlength="50" value="'+Data.data[0].mobilephone+'" />' +
                    '</div>' +
                    '<div class="add-delete-op"><button class="sham-btn sham-btn-sure">确定</button> <button class="sham-btn sham-btn-default">取消</button> </div>' +
                    '</div></div></div>';
                var _index = layer.open({
                    type: 1,
                    closeBtn: 0,
                    shade: [0.7],
                    title: false,
                    area: [],
                    resize: false,
                    content: _str,
                    success: function () {
                        if(regionIds){
                            var aera=regionIds.split(',');
                            // console.log(aera);
                            getArea('000000000000',0,aera[0]);// 获取全国
                            if(aera.length > 1) {
                                getArea(aera[0],1,aera[1]);// 获取市
                            }else {
                                /*if(aera[0]!=="000000000001") {
                                    getArea(aera[0],1); // 市
                                }*/
                                if(aera[0]==="000000000001"||aera[0]==="710000000000"||aera[0]==="810000000000"||aera[0]==="820000000000"){
                                    $('.getShi,.getXian,.getXiang').attr('disabled',true).addClass('z-disabled');
                                }else if(aera[0]==="0"){
                                    $('.getShi,.getXian,.getXiang').attr('disabled',true).addClass('z-disabled');
                                }else {
                                    _this.getArea(aera[0],1); //市
                                    if(aera[1]==undefined){
                                        $('.getXian,.getXiang').attr('disabled',true).addClass('z-disabled');
                                    }else{
                                        if(aera[2]===undefined){
                                            $('.getXiang').attr('disabled',true).addClass('z-disabled');
                                        }
                                    }
                                }
                            }
                            if(aera.length === 2) {
                                if(aera[1]==="0"){
                                    $('.getXian,.getXiang').attr('disabled',true).addClass('z-disabled');
                                }else{
                                    if(aera[2]==undefined){
                                        $('.getXiang').attr('disabled',true).addClass('z-disabled');
                                    }
                                }
                                getArea(aera[1],2);// 获取xian
                            }
                            if(aera.length === 3) {
                                if(aera[2]==="0"){
                                    $('.getXiang').attr('disabled',true).addClass('z-disabled');
                                }
                                getArea(aera[1],2,aera[2]);// 获取xian
                                getArea(aera[2],3);// 获取xian
                            }
                            if(aera.length === 4) {
                                getArea(aera[1],2,aera[2]);// 获取xian
                                getArea(aera[2],3,aera[3]);// 获取xian
                            }
                        }else {
                            getArea('000000000000',0);// 获取全国
                        }
                        $('.getSheng').change(function(){
                            $('.getShi').html('<option value="0">市</option>');
                            $('.getXian').html('<option value="0">县</option>');
                            $('.getXiang').html('<option value="0">乡</option>');
                            /*if($(this).val()!=="000000000001") {
                                getArea($(this).val(),1); // 市
                            }*/
                            if($(this).val()==="000000000001"||$(this).val()==="710000000000"||$(this).val()==="810000000000"||$(this).val()==="820000000000"){
                                $('.getShi,.getXian,.getXiang').attr('disabled','true').addClass('z-disabled');
                            }else if($(this).val() === "0"){
                                $('.getShi,.getXian,.getXiang').attr('disabled','true').addClass('z-disabled');
                            }else {
                                $('.getShi').attr('disabled',false).removeClass('z-disabled');
                                $('.getXian,.getXiang').attr('disabled','true').addClass('z-disabled');
                                _this.getArea($(this).val(),1); //市
                            }
                        });
                        $('.getShi').change(function(){
                            $('.getXian').html('<option value="0">县</option>');
                            $('.getXiang').html('<option value="0">乡</option>');
                            if($(this).val() === "0") {
                                $('.getXian,.getXiang').attr('disabled','true').addClass('z-disabled');
                            }else{
                                $('.getXian').attr('disabled',false).removeClass('z-disabled');
                                $('.getXiang').attr('disabled','true').addClass('z-disabled');
                            }
                            getArea($(this).val(),2); // 县
                        });
                        $('.getXian').change(function(){
                            $('.getXiang').html('<option value="0">乡</option>');
                            if($(this).val() === "0") {
                                $('.getXiang').attr('disabled','true').addClass('z-disabled');
                            }else{
                                $('.getXiang').attr('disabled',false).removeClass('z-disabled');
                            }
                            getArea($(this).val(),3); // 乡
                        });
                        // 确定按钮
                        $(".sham-btn-sure").off("click").on("click",function () {
                            var _msg = "";
                            var _ip = $("#add_ip").val();// IP地址
                            var _place = $("#add_places").val();// 具体地址
                            var _longitude = $("#add_longitude").val();// 经度
                            var _latitude = $("#add_latitude").val();// 纬度
                            var _personName = $("#add_personName").val();// 负责人姓名
                            var _personPhone = $("#add_personPhone").val();// 负责人电话
                            var _addPort = $("#add_port").val();// 端口

                            var val = "";// 行政区域
                            var province = $("#select_city option:selected").val();// 省
                            var city = $("#city option:selected").val();// 市
                            var area = $("#area option:selected").val();// 县
                            var county = $("#country option:selected").val();// 乡

                            if(county != "" && county != "0") {// 乡
                                val = county;
                            }else if (area != "" && area != "0"){// 县
                                val = area;
                            }else if (city != "" && city != "0"){// 市
                                val = city;
                            }else if (province != "" && province != "0"){// 省
                                val = province;
                            }

                            if(_ip == "") {
                                _msg += "IP地址";
                            }
                            if(_addPort == "") {
                                if(_msg != "") {
                                    _msg += "、";
                                }
                                _msg += "端口号"
                            }
                            if(val == "" || val == "0") {
                                if(_msg != "") {
                                    _msg += "、";
                                }
                                _msg += "所属区域"
                            }
                            if(_personPhone == "") {
                                if(_msg != "") {
                                    _msg += "、";
                                }
                                _msg += "负责人电话"
                            }
                            if(_msg != "") {
                                layer.msg(_msg + "不能为空");
                                return;
                            }
                            if(_ip && checkIp(_ip) == false){
                                layer.msg('请输入正确的ip地址')
                                return;
                            }
                            var ref=/^1[3|4|5|7|8][0-9]{9}$/;
                            if(!ref.test(_personPhone)) {
                                layer.msg("请输入正确的手机号");
                                return;
                            }
                            var longitudeval = /^\d{0,3}$/;
                            if(!longitudeval.test(_longitude)){
                                layer.msg("请输入正确的经度");
                                return;
                            }
                            if(!longitudeval.test(_latitude)){
                                layer.msg("请输入正确的维度");
                                return;
                            }
                            // 更改接口
                            $.ajax({
                                type:"POST",
                                url:"locationPosition/info/updateLocationPosition.do",
                                dataType:"JSON",
                                data:{
                                    guid:Data.data[0].guid,// 位置信息ID
                                    ip:_ip,// IP地址
                                    port:_addPort, // 端口号
                                    regionId:val,// 行政区域id
                                    address:_place,// 详细地址
                                    leader:_personName,// 负责人姓名
                                    mobilephone:_personPhone,// 负责人电话
                                    longitude:_longitude,// 经度
                                    latitude:_latitude,// 维度
                                    version:Data.data[0].version,// 版本号，必填的
                                },
                                success: function (data) {
                                    console.log(typeof data);
                                    if(data.result) {
                                        layer.msg(data.msg);
                                        layer.close(_index);
                                        return;
                                    }else{
                                        layer.msg(data.msg);
                                        layer.close(_index);
                                        return;
                                    }
                                },
                                error: function () {
                                    layer.msg("请求出错");
                                }
                            })
                        });
                        // 关闭按钮
                        $(".address-add .sham-btn-default,.address-add .zlayer-close").off("click").on("click",function () {
                            layer.close(_index);
                            return;
                        });
                    }
                });
            }
        }
    });
}

/*
 * 判断用户session是否有效
 */
function isLogonError(data) {
    if (data.logon_error) {
        //内容编辑页面 检测 视频编辑时 是否绑定 beforunload ,解绑
        var obEvt=$._data($(window)[0],'events');
        if(obEvt&&obEvt['beforeunload']) $(window).off('beforeunload');
        
        window.location.href = "userManagement/login.do";
        localStorage.removeItem('downclose');
        localStorage.removeItem('user');
        return false;
    }
    return true;
}

/**
 * 滚动条函数-ztw
 * @param obj:niceScroll对象，如果页面中多个需要调用参数为数组把目标传过来即可
 * width为滚动条的宽度 right为滚动条的偏移量如-15 opacity为滚动条的透明度 color为滚动条的颜色 obj为初始化滚动条的对象
 * 当不需要其他的参数设置时，可以直接传对象不需要json格式如：setNiceScroll(div1) setNiceScroll([div1,{obj:div2,width:3px}])
 */
function setNiceScroll(data) {
    var _defaultColor = "#536597",
        _defaultWidth = '3px',
        _defaultOpacity = 1,
        _defaultRight = 0;
    if (!data) {//判断为空
        return;
    } else if (Array.isArray(data)) {//判断为数组
        if (data.length) {//判断数组是否为空
            for (var i = 0, _len = data.length; i < _len; i++) {
                fnScroll(data[i]);
            }
        } else {
            return;
        }
    } else {
        fnScroll(data);
    }

    function fnScroll(obj) {
        var _color = obj.color ? obj.color : _defaultColor, //颜色
            _width = parseInt(obj.width) ? obj.width : _defaultWidth, //宽度因为jquery对象有width方法所以parseInt下
            _opacity = obj.opacity ? obj.opacity : _defaultOpacity, //透明度
            _right = obj.right ? parseInt(obj.right) : _defaultRight; //right偏移量

        if (typeof obj == 'object' && !obj.length && obj.length != 0) { //判断是否为json类型
            obj = obj.obj;
        }

        obj.niceScroll({
            cursorcolor: _color,//#CC0071 光标颜色
            cursoropacitymax: _opacity, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
            touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
            cursorwidth: _width, //像素光标的宽度
            cursorborder: "0", // 游标边框css定义
            railpadding: {"right": _right},
            autohidemode: "leave" //是否隐藏滚动条
        });
    }
}

//input只能输入数字
function inputNumber(target) {
    target.value = target.value.replace(/[\D]/g, '');
}

//补零函数 20位
function add1Zero(num){
    return ("00000000000000000000"+num).slice(-20);
}
/*******************************************************************************
 * 用于ajax访问springmvc跳转页面
 */
$.extend({
    StandardPost: function (url, args) {
        var form = $("<form id='form-post' method='post'></form>"), input;
        form.attr({
            "action": url
        });
        $.each(args, function (key, value) {
            input = $("<input type='hidden'>");
            input.attr({
                "name": key
            });
            input.val(value);
            form.append(input);
        });
        // form.removeAttr("onsubmit");
        form.appendTo(document.body).submit();
    }
});

String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};

String.prototype.ltrim = function () {
    return this.replace(/(^\s*)/g, "");
};

String.prototype.rtrim = function () {
    return this.replace(/(\s*$)/g, "");
};
var bus=new Vue()


//ip 验证
function checkIp(ip){
    //console.log(ip);
    var rep = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    if(!rep.test(ip)){
        return false;
    }else{
        return true;
    }
}

//对象转换
function ownJson(){
    var arr = [{func: 'abc', val: '启明1'}, {func: 'vc', val: '启明2'}];
    var keys = [];
    const values = []
    for (let index = 0; index < arr.length; index++) {
        var item = arr[index];
        keys.push(item.func);
        values.push(item.val);
    }
    const _thisa = {
        abc: '',
        vc: ''
    }
    for (var item in _thisa) {
        if(!Object.prototype.hasOwnProperty.call(_thisa,item)) {
            continue;
        }
        for (let index = 0; index < keys.length; index++) {
            const key =  keys[index];
            if (item === key) {
                _thisa[key] = values[index];
                keys.splice(index, 1);
                values.splice(index, 1);
            }
        }
    }
    console.log(_thisa)
}
/*防止被挤掉*/
function unStatus(num,type){
    var url="";
    //type: 3上传文件时，1上传完文件或关闭页面时
    if(num==1){
        //防止被下线
        url="userManagement/getStatus.do";
    }else if(num==2){
        //防止时间过长掉线
        url="operationManagement/systemConfiguration/getSystemConfig.do"
    }
    $.ajax({
        url:url,
        type:"POST",
        data:{
            status:type||"",
        },
        dataType:"JSON"
    });
}

/*websocket*/
function webscoket() {
    var webSocketUrl = "cms/websocket/webSocketServer/1";
    var val = new _websocket(webSocketUrl);
    val.init();
    var nowTime = Date.now();
    val.onMessage(function(dataUrl) {
        var Msg = $.parseJSON(dataUrl.data);
         //console.log(Msg)
        var MsgVal = Msg.msg;
        var time = Date.now();
        var timeD = 200;
        if(time-nowTime>200) {
            nowTime = time;

            //console.log(MsgVal);
            if(MsgVal == 1) {
                layer.closeAll();
                localStorage.removeItem("downClose");
                localStorage.removeItem("user");
                search();
            }else if(MsgVal == 2) {
                layer.closeAll();
                localStorage.removeItem("downClose");
                localStorage.removeItem("user");
                search();
            }else if(MsgVal.indexOf("%")>0) {
                //console.log(Msg)
                var number = MsgVal.replace("%","");//百分比转化成小数点
                var num =(Number(Msg.fileSize/1024)*Number(number/100)).toFixed(2);
                $(".loadingLayer span b").html(MsgVal);
                $("#downLoadFix span").html(num);
               // $(".smallPercentage11 span").html(MsgVal);
                $(".smallPercentage span")[0].innerText=MsgVal;
               //  $(".smallPercentage span").replaceWith('<span>'+MsgVal+'</span>');
            }

        }
        if(Msg.verStatus == 1) {
            layer.closeAll();
            $("#smalldownload").hide();
            loadSure();
            //console.log(Msg.fileVersion)
            $(".systemVision").html(Msg.systemVersion);
            $(".fileVision").html(Msg.fileVersion);
        }


    })
}
/*查询接口*/
function search() {
    $.ajax({
        url:"UserSystem/user/queryVersions.do",
        type:"POST",
        dataType:"JSON",
        success:function(data) {
            if(!data.result) {
//              layer.msg(data.msg);
            	console.log(data.msg);
                return;
                /*if(data.data == undefined) return;
                if(data.data.uploadStatus == 1) {
                    download(data,iundexVal);
                    return;
                }else{
                    if(data.data.newVersion == 1) {
                        schedule(data);
                    }
                    return;
                }*/

            }else{
                if(data.data.uploadStatus == 1) {
                    localStorage.getItem("downClose");
                    localStorage.getItem("user");
                    if(localStorage.getItem("downClose") == 2 && localStorage.getItem("user")) {
                        smallDownload(data);
                    }else{
                        download(data);
                        //downLoadData(data);
                    }

                }
                if(data.data.newVersion == 1) {
                    localStorage.getItem("downClose");
                    localStorage.getItem("user");
                    if(localStorage.getItem("downClose") == 3 && localStorage.getItem("user")) {
                        //download(data);
                    }else{
                        schedule(data);
                        //downLoadData(data);
                    }
                }
                if(data.data.uploadType == 1) {
                    localStorage.getItem("downClose");
                    localStorage.getItem("user");
                    if(localStorage.getItem("downClose") == 1 && localStorage.getItem("user")) {
                        //download(data);
                    }else{
                        upgrade(data);
                        //downLoadData(data);
                    }
                }
            }

        },
        error:function() {
            layer.msg("请求出错");
        }
    })
}

/*下载接口*/
function downLoadData(data) {
    download(data);
    $.ajax({
        url:"UserSystem/user/uploadVersion.do",
        type:"POST",
        dataType:"JSON",
        data:{
            filePath:data.data.filePath,
            fileName:data.data.fileName
        },
        success:function(Data) {
            if(!Data.result) {

                layer.closeAll();
                layer.msg(Data.msg);
                return;
            }else{
                //layer.msg(Data.msg);

            }


        },
        error:function(){
            layer.msg("请求出错")
        }
    })
}
/*升级提示*/
function upgrade(data) {
    var  _str = "<div class='z-layer-wrap'>";
    _str += '<div class="z-layer-box">';
    if(data.data.upgradetype == 2) {
        _str+="<div class='layer-top clearfix'><span class='layer-title'>升级提示</span><span class='vod-name'></span><span class='layer-topright' id='z-full-screen'><i class='fl z-layer-close icon iconfont icon-guanbi upClose'></i></span></div>";
        _str+='<div class="z-layer-content upgrade_layer">';
        _str+='<p class="messageFor">您好，云端有平台升级文件，请立即下载并更新，升级文件共 <span>'+(data.data.fileSize/1024).toFixed(2)+'</span>MB。此消息每两小时提示一次，直到平台升级完成。平台当前版本 <span>'+data.data.fileVersion+'</span>，升级后版本 <span>'+data.data.systemVersion+'</span>。</p>';
    }else if(data.data.upgradetype == 4) {
        _str+="<div class='layer-top clearfix'><span class='layer-title'>紧急升级提示</span><span class='vod-name'></span><span class='layer-topright' id='z-full-screen'><i class='fl z-layer-close icon iconfont icon-guanbi upClose'></i></span></div>";
        _str+='<div class="z-layer-content upgrade_layer">';
        _str+='<p  class="messageFor">您好，发现紧急平台升级文件，请立即下载并更新，升级文件共 <span>'+(data.data.fileSize/1024).toFixed(2)+'</span>MB。此消息每两小时提示一次，直到平台升级完成。平台当前版本 <span>'+data.data.fileVersion+'</span>，升级后版本 <span>'+data.data.systemVersion+'</span>。</p>';
    }

    _str+='<div class="btn-box">';
    _str+='<button class="z-layer-sure">下载</button>';
    _str+='<button class="z-layer-cancel">取消</button>';
    _str+='</div></div>';
    _str+='<div class="z-layer-bottom"><div class="layer-scroll"><div class="scrollY">'+
        '<h2>此提示每两小时提示一次，直到平台升级完成。</h2>'+
        '<div class="layer-list-item"><h1><b>┌</b><b>└</b>新版本号<b>┐</b><b>┘</b></h1><p>视联网存储服务系统'+data.data.systemVersion+'版本</p></div>'+
        '<div class="layer-list-item"><h1><b>┌</b><b>└</b>新增功能<b>┐</b><b>┘</b></h1>';
        if(data.data.remark == "") {
            _str+='<p>无</p>';
        }else{
            _str+='<p>'+data.data.remark+'</p>';
        }
        _str+='</div>'+
            '<div class="layer-list-item"><h1><b>┌</b><b>└</b>依赖项<b>┐</b><b>┘</b></h1>';
        if(data.data.isdepend == 0) {
            _str+='<p>无</p>';
        }else{
            _str+="<p>"+data.data.dependDesc+"</p>";
        }
    _str+='</div>'+
        '</div></div></div>';
    _str+='</div></div>';

    var index = layer.open({
        type:1,
        closeBtn:0,
        shade:[0.7],
        title:false,
        area: [],
        scrollbar: false,
        shadeClose: false, //点击遮罩关闭
        content:_str,
        success:function() {
            $(".z-layer-sure").on("click",function() {
               // layer.close(index);
                //download(data);
               downLoadData(data);
               layer.close(index);
            })
            //点击关闭、取消按钮
            $(".upClose,.z-layer-cancel").on("click",function() {
                layer.close(index);
                /*var dataTime = new Date().getTime();//当前时间戳
                var userid = $("#userId").val();
                sessionStorage.setItem("user1",userid);
                sessionStorage.setItem("downClose1",dataTime);*/
                var userid = $("#userId").val();
                localStorage.setItem("user",userid)
                localStorage.setItem("downClose",1);
            })
            /*//点击取消按钮
            $(".z-layer-cancel").on("click",function() {
                layer.close(index);
            })*/
        }
    })
}

/*下载进度弹框*/
function download(data) {
    /*console.log(22,data);
    index = indexVal
    console.log(index)*/
    var that = $(this);
    //console.log(MsgVal);
   // var number = MsgVal.replace("%","");//百分比转化成小数点

    var  _str = "<div class='z-layer-wrap'>";
    _str += '<div class="z-layer-box">';
    if(data.data.upgradetype == 2) {
        _str+="<div class='layer-top clearfix'><span class='layer-title'>升级提示</span><span class='vod-name'></span><span class='layer-topright' id='z-full-screen'><i class='fl z-layer-close icon iconfont icon-guanbi downClose'></i></span></div>";
    }else if(data.data.upgradetype == 4) {
        _str+="<div class='layer-top clearfix'><span class='layer-title'>紧急升级提示</span><span class='vod-name'></span><span class='layer-topright' id='z-full-screen'><i class='fl z-layer-close icon iconfont icon-guanbi downClose'></i></span></div>";
    }
    _str+='<div class="z-layer-content upgrade_layer">';
    _str+='<p id="downLoadFix">平台文件正在下载中，共'+(data.data.fileSize/1024).toFixed(2)+'MB当前已下载<span></span>MB...请耐心等待！</p>';
    _str+='<div class="spinner">'+
        '<b></b>'+
        '<div class="rect1"></div>'+
        '<div class="rect2"></div>'+
        '<div class="rect3"></div>'+
        '<div class="rect4"></div>'+
        '<div class="rect5"></div>'+
        '</div>'+
        '<div class="loadingLayer"><span>LOADING...<b></b></span></div></div>';
    _str+='<div class="z-layer-bottom"><div class="layer-scroll"><div class="scrollY">'+
        '<h2>此提示每两小时提示一次，直到平台升级完成。</h2>'+
        '<div class="layer-list-item"><h1><b>┌</b><b>└</b>新版本号<b>┐</b><b>┘</b></h1><p>视联网存储服务系统'+data.data.systemVersion+'版本</p></div>'+
        '<div class="layer-list-item"><h1><b>┌</b><b>└</b>新增功能<b>┐</b><b>┘</b></h1>';
    if(data.data.remark == "") {
        _str+='<p>无</p>';
    }else{
        _str+='<p>'+data.data.remark+'</p>';
    }
    _str+='</div>'+
        '<div class="layer-list-item"><h1><b>┌</b><b>└</b>依赖项<b>┐</b><b>┘</b></h1>';
    if(data.data.isdepend == 0) {
        _str+='<p>无</p>';
    }else{
        _str+="<p>"+data.data.dependDesc+"</p>";
    }
    _str+='</div>'+
        '</div></div></div>';
    _str+='</div></div>';
    var indexVal = layer.open({
        type:1,
        closeBtn:0,
        shade:[0.7],
        title:false,
        area: [],
        scrollbar: false,
        shadeClose: false, //点击遮罩关闭
        content:_str,
        success:function() {
            $(".downClose").on("click",function() {
                /*var dataTime2 = new Date().getTime();//当前时间戳
                var userid = $("#userId").val();
                sessionStorage.setItem("user2",userid)
                sessionStorage.setItem("downClose2",dataTime2);*/
                var userid = $("#userId").val();
                localStorage.setItem("user",userid)
                localStorage.setItem("downClose",2);
                layer.close(indexVal);
                smallDownload(data);
            })
        }
    })
    /*var _str='<div class="z-layer-content upgrade_layer">'+
        '<p id="downLoadFix">平台文件正在下载中，共'+(data.data.fileSize/1024).toFixed(2)+'MB当前已下载<span></span>MB...请耐心等待！</p>'+
        '<div class="spinner">'+
        '<div class="rect1"></div>'+
        '<div class="rect2"></div>'+
        '<div class="rect3"></div>'+
        '<div class="rect4"></div>'+
        '<div class="rect5"></div>'+
        '</div>'+
        '<div class="loadingLayer"><span>LOADING...<b></b></span></div></div>'+
        '</div>';
    $(".upgrade_layer").replaceWith(_str);
    var loadVal = $(".loadingLayer span b").html();
    //console.log(loadVal);
    if(loadVal == '100%') {
        layer.close(index);
        loadSure(data);
    }*/
}
/*下载进度提示框*/
function smallDownload(data) {
    $("#smalldownload").show();
}
/*下载完后确定*/
function loadSure() {
    var str='<div class="z-layer-wrap z-layer-right">'+
        '<div class="z-layer-box">'+
        '<div class="layer-top clearfix"><span class="layer-title">升级提示</span><span class="vod-name"></span><span class="layer-topright" id="z-full-screen"><i class="fl z-layer-close icon iconfont icon-guanbi closeBtn"></i></span></div>'+
        '<div class="layer-bottom loadSureText"><p>您好！平台升级文件已下载完成，请及时更新！平台当前版本<span class="fileVision"></span>，升级后版本<span class="systemVision"></span>。</p><button class="right-layer-sureBtn">确 定</button></div>'+
        '</div>'+
        '</div>';
    var _index = layer.open({
        type:1,
        closeBtn:0,
        shade:[0.7],
        title:false,
        area: [],
        scrollbar: false,
        shadeClose: false, //点击遮罩关闭
        content:str,
        success:function() {
            //console.log(index)
            //点击确定按钮
            $(".right-layer-sureBtn").on("click",function() {
                layer.close(_index);
                $.ajax({
                    url: "UserSystem/user/queryVersions.do",
                    type: "POST",
                    dataType: "JSON",
                    success: function (data) {
                        schedule(data);
                    }
                })

            })
            //点击关闭按钮
            $(".closeBtn").on("click",function() {
                layer.close(_index);
                //schedule(data);
            })
        }
    })
}
/*下载完后升级*/
function schedule(data) {
    //console.log(data)
    var  _str = "<div class='z-layer-wrap'>";
    _str += '<div class="z-layer-box download-layer">';
    _str+="<div class='layer-top clearfix'><span class='layer-title'>升级提示</span><span class='vod-name'></span><span class='layer-topright' id='z-full-screen'><i class='fl z-layer-close icon iconfont icon-guanbi downfileBtn'></i></span></div>";
    _str+='<div class="z-layer-content upgrade_layer">\
                        <ul class="layerList">\
                        <li><b>1</b><br>升级文件</li>';
                        if(data.data.fileName == null) {
                            _str+=' <li><span>用服务器中的升级文件将文件覆盖</span></li>';
                        }else{
                            _str+=' <li><span>请到'+data.data.versionAddress+'下，<br>找到'+data.data.fileName+'文件升级</span></li>';
                        }

                        _str+='<li><b>2</b><br>手动升级</li>\
                        <li><span><br>重启服务</span></li>\
                        <li><b>3</b><br>升级成功</li>\
                        </ul>\
                       <p class="downLoadImg">下载已完成，请更新！</p> \
                        </div>';
    _str+='<div class="z-layer-bottom"><div class="layer-scroll"><div class="scrollY">'+
        '<h2>此提示每两小时提示一次，直到平台升级完成。</h2>'+
        '<div class="layer-list-item"><h1><b>┌</b><b>└</b>新版本号<b>┐</b><b>┘</b></h1><p>视联网存储服务系统'+data.data.systemVersion+'版本</p></div>'+
        '<div class="layer-list-item"><h1><b>┌</b><b>└</b>.新增功能<b>┐</b><b>┘</b></h1>';
        if(data.data.remark == "") {
            _str+='<p>无</p>';
        }else{
            _str+='<p>'+data.data.remark+'</p>';
        }
        _str+='</div>'+
        '<div class="layer-list-item"><h1><b>┌</b><b>└</b>依赖项<b>┐</b><b>┘</b></h1>';
        if(data.data.isdepend == 0) {
            _str+='<p>无</p>';
        }else{
            _str+="<p>"+data.data.dependDesc+"</p>";
        }
        '</div></div></div>';
    _str+='</div></div>';

    var Index = layer.open({
        type:1,
        closeBtn:0,
        shade:[0.7],
        title:false,
        area: [],
        scrollbar: false,
        shadeClose: false, //点击遮罩关闭
        content:_str,
        success:function() {
            //console.log(index)
            //点击下载按钮
            /*$(".z-layer-sure").on("click",function() {
                download(index);
            })*/
            //点击关闭按钮
            $(".downfileBtn").on("click",function() {
                layer.close(Index);
                /*var dataTime3 = new Date().getTime();//当前时间戳
                var userid = $("#userId").val();
                //console.log($("#userId").val());
                sessionStorage.setItem("user3",userid)
                sessionStorage.setItem("downClose3",dataTime3);*/
                var userid = $("#userId").val();
                localStorage.setItem("user",userid)
                localStorage.setItem("downClose",3);
            })
        }
    })
}


/**
 * 自定义遮罩
 * 
 * @param selectEl：string  ， 
 *  'hide' 移除遮罩  cloudLoading('hide') ，
 * cloudLoading()添加遮罩 窗口,
 * cloudLoading(css选择器)，添加遮罩至目标元素
 */
function cloudLoading(selectEl){
     if(selectEl){
         if(selectEl=="hide"){
             if($('#cloudLoadingShow')){
                $('#cloudLoadingShow').remove();
                return;
             }
         }
     }
     //
  var imagePath= home_path+"resources/images/loding1.gif",
      contextId="cloudLoadingShow",       
      str=$('<div id='+contextId+'><img alt=""></div>');
      str.css({
         "zIndex":998,
         "left":0,
         "right":0,
         "top":0,
         "bottom":0,
         "backgroundColor":" rgba(0, 0, 0, 0.3)"
      });
      str.find('img').css({
        "position":"absolute",
        "left":"50%",
        "top":"50%", 
        "marginLeft":"-25px",
        "marginTop":"-25px",
        "width":"50px",
        "height":"50px",
      }).attr("src",imagePath);
    var position="";
    if(selectEl&&selectEl!=="hide"){
            position=$(selectEl).css("position");
            if(position!=="relative"||position!=="absolute"){
                $(selectEl).css("position","relative");
            }
            str.css("position","absolute");
            $(selectEl).append(str);
        
    }else{
        str.css("position","fixed");
        $(document.body).append(str);

    }  
}



