    <template>
           <div class="header-box">           
                <h1 class="header-logo">
                    <a href="main">
                        <img src="../assets/images/logo.png" alt=""/>
                        <strong>视联网存储服务系统&nbsp;122333</strong>
                    </a>
                </h1>
                <nav class="header-nav">
                   <ul>
                        <li :class="{'active':message==1}"><a href="main">首页</a></li>
                        <li :class="{'active':message==2}"><a href="materialResources">内容管理</a></li>
                        <li :class="{'active':message==3}"><a href="videoResources">视频资源</a> </li>
                        <li :class="{'active':message==4}"><a href="userManagement">用户管理</a></li>
                        <li :class="{'active':message==5}"><a href="operationManagement">运维管理</a></li>
			              </ul>
                </nav>
		
                <div class="heder-userinfo">
                    <div class="heder-userinfo-login">
                        <i class="iconfont icon-yonghuming"></i>
                        <a class="heder-userinfo-op" href="javascript:;">{{username}}</a>
                    </div>
                    <div class="heder-userinfo-cancel">
                        <i class="iconfont icon-zhuxiao"></i>
                        <a class="heder-userinfo-op" href="javascript:;">注销</a>
                    </div>
                </div>

            </div>
    </template>
  <script>
      export default {
        name: "Hearders",
        props: ["message", "username"],
        data() {
          return {
        
          };
        }
      };
</script>
<style scoped>

.header-box {
  position: relative;
  max-width: 19.2rem;
  height: 1.2rem;
  background-image: url(../assets/images/nav_bg12.png?1);
  background-size: 100% 100%;
  background-color: #030d26;
}
.header-logo {
  float: left;
  width: 5.3rem;
  line-height: 1.18rem;
  overflow: hidden;
}
.header-logo a {
  padding-left: 0.4rem;
}

.header-logo img {
  width: 0.45rem;
  height: 0.53rem;
  vertical-align: middle;
}

.header-logo strong {
  padding-left: 0.2rem;
  font-size: 0.3rem;
  color: #cfe2fd;
  font-weight: normal;
  vertical-align: middle;
  font-family: "微软雅黑";
}

.header-nav {
  float: left;
  width: 10.1rem;
  height: 1.2rem;
}

.header-nav ul {
  padding-left: 0.12rem;
  overflow: hidden;
}

.header-nav li {
  position: relative;
  float: left;
  margin: 0 0.2rem;
  padding-top: 0.45rem;
  width: 1.4rem;
  text-align: center;
}
.header-nav a {
  display: block;
  height: 0.5rem;
  line-height: 0.5rem;
  font-size: 0.26rem;
  color: #e6f8fe;
}
.header-nav li.active a {
  line-height: 0.5rem !important;
  background-color: #b4e1fe !important;
  color: #030d26;
  border: 0 !important;
}

.header-nav li:hover a {
  border: 0.01rem solid #78a4c0;
  background-color: #0f264f;
  line-height: 0.48rem;
}

.heder-userinfo {
  float: right;
  padding: 0.12rem 0 0 0.36rem;
  width: 2.84rem;
  height: 0.52rem;
}
.heder-userinfo .iconfont {
  float: left;
  width: 0.48rem;
  line-height: 0.52rem;
  text-align: center;
  color: #cfe2fd;
  font-size: 0.28rem;
}
.heder-userinfo-op {
  float: left;
  width: 0.9rem;
  line-height: 0.48rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #cfe2fd;
  font-size: 0.24rem;
  cursor: pointer;
}
</style>
    
    
    