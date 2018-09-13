<template>
  <div class="login-box">
			<div class="login-box-title">
				<h1>
					<img src="../images/login_logo.png" />
					<span>视联网内容管理系统</span>
				</h1>
			</div>
			<div class="login-box-content">			
				<div class="login-box-content-input"><label class=""></label><input id="user_name" type="text" v-model="user_name" placeholder="请输入账号"/></div>
				<div class="login-box-content-input"><label class=""></label><input id="pass_word" type="password" v-model="pass_word" placeholder="请输入密码"/></div>
				<div class="login-box-content-button">
					<button id="login_btn" @click="login()" >登&nbsp;&nbsp;录</button>
					<!-- <aaaaa :name="4"></aaaaa> -->
				</div>
			</div>
  </div>
</template>

<script>
import qs from 'qs';
export default {
  	name: 'login',
    data(){
        return {
            user_name:'',
            pass_word:'',
            lock:true, 
        };
    },
    mounted(){
        var _this=this;
        document.onkeydown=function(e){
            if(e.keyCode==13){
                _this.login();
            }
        }
    },
    methods:{
        login(){
            var _this=this;
           if(!this.lock) return;
           
            // this.$layerMsg.show(document.querySelector('.login-box-content'),'jajajaj');
            // window.location='http://192.168.95.182:8080/cms';
            let ref =/^[A-Za-z0-9_]+$/;
            if(!this.user_name){
                this.$layerMsg.show('用户名不能为空');          
                return;
            }else if(!ref.test(this.user_name)){
                this.$layerMsg.show('请输入正确的用户名，英文数字下划线');
                return;
            }
            if(!this.pass_word){
                this.$layerMsg.show('密码不能为空');
                return;
			}
			// this.$loading.showng(document.querySelector('.login-box-content'));
			// let path ='/api/user/logon.do';
			let path ='/api/userManagement/logon.do';
			// let opt ={
 			// 		name:this.user_name,
            //         pwd:this.pass_word
			// };
			let opt ={
 					username:this.user_name,
                    password:this.pass_word
			};
            this.lock =false; 
            this.$http.post(path,opt,{
                transformRequest:[function(params){
					
					return qs.stringify(params);
					
                }],
                // headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then((res)=>{
                if(res.data.result){
                    window.location='main';
				}  
				// console.log(res);           
                this.$layerMsg.show(res.data.msg);
                this.lock =true;              
            }).catch((err)=>{
                this.lock =true;
			});  
			// this.$http.get('api/users/getUser',{
			// 	params:{
			// 		id:1
			// 	}
			// })
			// .then((res)=>{
			// 	window.location='main';
			// 	this.lock =true; 
			// })
			// .catch((err)=>{
			// 	 this.lock =true;
			// 	 console.log(err);
			// })            
        }
    }
}
</script>

<style>
.login-box{
	position: absolute;
	width: 9.08rem;
	left: 50%;
	top: 50%;
	transform:translate(-50%, -50%);
}

.login-box-title{
	margin-bottom: 0.62rem;
	height:0.8rem;
	line-height: 0.8rem;
	text-align:center;
	color:#cfe2fd;
	font-size: 0;
}

.login-box-title img{
	vertical-align: middle;
}

.login-box-title span{
	padding-left: 0.3rem;
	vertical-align: middle;
	font-size:0.6rem;
	letter-spacing: 0.2rem;
	font-family: '微软雅黑';
}

.login-box-content{
	box-sizing: border-box;
	padding: 0.55rem 1.35rem;
	width: 9.08rem;
	background-color: rgba(207,226,253,.15)
}

.login-box-content-input{
	position: relative;
	padding-left: 0.9rem;
	margin-top: 0.14rem;
	height: 0.64rem;
	line-height: 0.64rem;
	border-bottom: 1px solid #4d5a72;
}

.login-box-content-input label{
	position: absolute;
	top: 0;
	left: 0;
	width: 0.7rem;
	height: 0.64rem;
	font-size: 0.3rem;
	text-align: right;
	color:#cfe2fd;
}
.login-box-content-input:first-child{
	background: url('../images/ico_user.png') no-repeat 0.4rem/ 0.3rem 0.3rem;
}
.login-box-content-input:nth-child(2){
	background: url('../images/ico_password.png') no-repeat 0.4rem/ 0.3rem 0.3rem;
}
.login-box-content-input input{
	width: 100%;
	height: 0.64rem;
	font-size: 0.26rem;
	color:#cfe2fd;
	border:none;
	background: none;
}
.login-box-content-input input:-webkit-autofill{
	-webkit-text-fill-color:#cfe2fd;
	-webkit-animation: autofill-fix 1s infinite;
}
.login-box-content-input input:focus{
	-webkit-text-fill-color:#cfe2fd;
}
@-webkit-keyframes autofill-fix {
	from {
		background-color: transparent
	}
	to {
		background-color: transparent
	}
}

.login-box-content-button{
	margin:30px 0;
}

.login-box-content-button button{
	box-sizing:content-box;
	width:100%;
	height:0.5rem;
	line-height:0.5rem;
	font-size:0.3rem;
	text-align:center;
	color:#fff;
	background-color:#3483fd;
	border:none;
	border-top:5px solid #307bfb;
	border-bottom:5px solid #307bfb;
	cursor:pointer;
}

</style>
