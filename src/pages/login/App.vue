<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  	name: 'App', 
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
</style>
