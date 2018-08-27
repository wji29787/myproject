// var _websocket = {
//     option: {
//         websocket: null, //存websocket对象
//         url: '', //websocket链接地址，暂无用
//         userId: '', //websocket当前用户ID，暂无用
//         type: 0
//     },
//     init: function (url) {
//         this.option.url = url;
//         if (window.WebSocket || window.MozWebSocket) {
//             this.option.websocket = new WebSocket("ws://" + this.option.url + "/cms/websocket/videoDownloadWebsocket");
//             this.option.websocket.onopen = this.onOpen;
//             this.option.websocket.onerror = this.onError;
//             this.option.websocket.onclose = this.onClose;
//             this.option.websocket.onmessage = this.onMessage;
//             this.winowClose();
//         } else {
//             console.log('浏览器不支持此业务，请选择其他浏览器');
//         }
//     },
//     send: function (data) {
//         this.option.websocket.send(data);
//     },
//     close: function () {//websocket关闭事件
//         this.option.websocket.close();
//     },
//     onError: function (data) {
//         console.log('websocket出错');
//     },
//     onOpen: function () {//websocket打开事件
//         console.log('websocket已建立');
//         _websocket.timer();
//         /*console.log(_websocket.option.websocket.readyState)*/
//     },
//     onClose: function () { //关闭事件
//         console.log('websocket连接已关闭');
//         setTimeout(function () {
//             if (!_websocket.type) { //如果自己断开重连
//                 _websocket.reconnect();
//             }
//         }, 1000);
//     },
//     onMessage: function (data) { //接受信息
//         console.log(data.data);
//         console.log('我收到了信息');
//     },
//     reconnect: function () { //重连
//         this.init(this.option.url);
//     },
//     winowClose: function () { //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
//         window.onbeforeunload = function () {
//             _websocket.type == 1; //存储当前的关闭类型
//             _websocket.close();
//         };
//     },
//     /**
//      * 获取当前时间
//      */
//     formatDateTime: function (date) {
//         var y = date.getFullYear(), //年
//             m = date.getMonth() + 1, //月
//             d = date.getDate(), //日
//             h = date.getHours(), //时
//             minute = date.getMinutes(), //分
//             second = date.getSeconds(); //秒
//         /**
//          * 小于10的值补零
//          * @n {Number}
//          * */
//         function repair(n) {
//             return n < 10 ? ('0' + n) : n;
//         }
//
//         m = repair(m);
//         h = repair(h);
//         d = repair(d);
//         minute = repair(minute);
//         second = repair(second);
//         return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
//     },
//     timer: function () {
//         var _this = this;
//         return setInterval(function () {
//             if (_this.option.websocket.readyState == 1) {
//                 var Keepalive = {
//                     timer: _this.formatDateTime(new Date()) //当前时间
//                 };
//                 _this.option.websocket.send(JSON.stringify(Keepalive));
//                 //console.log(JSON.stringify(Keepalive),"保持心跳");
//             } else {
//                 console.log("发送心跳时断开连接！");
//             }
//         }, 5000);
//     }
// };


//websocket
function _websocket(url,time){
    this.option={
        websocket: null, //存websocket对象
        url: url, //websocket链接地址，暂无用
        closeType: 0,//关闭类型
        keepTime: time||5000, //保持心跳时间
        timer:null,
        data:'',
        host:window.location.host
    }
    // this.list=[];
}
_websocket.prototype = {
    constructor:_websocket,
    init: function () {
        var _this=this;
        if (window.WebSocket || window.MozWebSocket) {
            this.option.websocket = new WebSocket("ws://" + this.option.host+"/"+this.option.url);
            this.option.websocket.onopen = this.onOpen.bind(this);
            this.option.websocket.onerror = this.onError;
            this.option.websocket.onclose = this.onClose.bind(this);
            // this.option.websocket.onmessage = function(data){
            //     _this.onMessage(data);
            // };
            this.winowClose();
            this.option.timer=this.keepConnect(this.option.keepTime);

        } else {
            console.log('浏览器不支持此业务，请选择其他浏览器');
        }
    },
    send: function (data) {
        this.option.websocket.send(data);
    },
    close: function () {//websocket关闭事件
        this.option.websocket.close();
        this.option.closeType = 1; //存储当前的关闭类型
        clearInterval(this.option.timer);
    },
    onError: function (data) {
        console.log('websocket出错');
    },
    onOpen: function (e) {//websocket打开事件
        console.log('websocket已建立');
    },
    onClose: function (e) { //关闭事件
       // console.log(e);
        var _this = this;
        console.log('websocket连接已关闭');
        if (this.option.closeType == 0) { //如果自己断开重连
            setTimeout(function () {
                _this.reconnect();
            }, 1000);
        }
    },
    onMessage: function (fn) { //接受信息
        // console.log(data.data);
        // console.log('我收到了信息');
         this.option.websocket.onmessage=fn;
    },
    reconnect: function () { //重连
       // console.log(this.option.timer);
       
        this.init(this.option.url, this.option.keepTime);
    },
    winowClose: function () {
//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常
        var _this=this;
        window.onbeforeunload = function () {
            _this.close();
        };
    },
    keepConnect: function (time) {
        var _this = this,
            time = time ? time : 5000;
        if(_this.option.timer){
            clearInterval(this.option.timer);
        }    
        return  setInterval(function () {
            if (_this.option.websocket.readyState == 1) {
                var Keepalive = {timer: 1}; //特殊的指令,保证连接有效性，跟后端沟通，定义参数
                _this.option.websocket.send(JSON.stringify(Keepalive));
            } else {
                console.log("发送心跳时断开连接！");
            }
        }, time);
    },
    on:function (type,fn) {
        this.list.push({
            type:type,
            callback:fn,
        })
    }
};
//初始化websocket并且保持心跳
// _websocket.init(window.location.host,5000);
	

	
