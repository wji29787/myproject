<template>
  <div class="login-box" id="app">
			<div class="login-box-title">
				<h1>
					<img src="./images/login_logo.png" />
					<span>视联网内容管理系统</span>
				</h1>
			</div>
			<div class="login-box-content">			
				<div class="login-box-content-input"><label class=""></label><input id="user_name" type="text" v-model="user_name" placeholder="请输入账号"/></div>
				<div class="login-box-content-input"><label class=""></label><input id="pass_word" type="password" v-model="pass_word" placeholder="请输入密码"/></div>
				<div class="login-box-content-button">
					<button id="login_btn" @click="login()" >登&nbsp;&nbsp;录</button>
				</div>
			</div>
  </div>
</template>

<script>
export default {
  name: 'App',
  // components:{
  //   Hearders
	// }
	  data(){
			return {
				user_name:'',
				pass_word:''
			};
		},
		methods:{
			login(){

			}
		}
}
</script>

<style>
body{
	position: relative;
	background:url('images/login_bg.png') #111b33 no-repeat center center;
	background-size:100% 100%;
}

input,button{
	font-size: inherit;
	line-height: inherit;
	color: inherit;
	outline: none;
}

input::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #9eabbe;
    opacity:1;
}

input:-ms-input-placeholder{
    color: #9eabbe;
    opacity:1;
}

input::-webkit-input-placeholder{
    color: #9eabbe;
    opacity:1;
}

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
	background: url('./images/ico_user.png') no-repeat 0.4rem/ 0.3rem 0.3rem;
}
.login-box-content-input:nth-child(2){
	background: url('./images/ico_password.png') no-repeat 0.4rem/ 0.3rem 0.3rem;
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
