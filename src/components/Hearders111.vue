
    <template>
        <ul class="nav-level-one">
            <li v-for="(item,$index) in pathUrl" :class="{'active':num==($index+1)}" :key="$index" >
                <a href="javascript:;" @click="fnRedirect(item,$index)"><i class="fl iconfont" :class="item.currentClass"></i>{{item.text}}</a>
             </li>
        </ul>
    </template>     
  <script>
   export default {
        name:'Hearders',
        data(){
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
        methods: {
            fnRedirect: function (list,num)// 重定向页面
            {   
                if((num+1)==this.num){
                    return;
                } 
                window.location = home_path + list.url;
            }
        }
  }
  </script>
  <style>
  
  </style>
  
        