<template>
  <div id="app" class="box-body">
    <Hearders :message="1"></Hearders>  
    <router-view></router-view>
  </div>
</template>

<script>
import Hearders from '../../components/Hearders';
export default {
  name: 'App',
  components:{
    Hearders
  },
  methods:{
    upload(){
        var BYTES_PER_CHUNK = 1024 * 1024; // 每个文件切片大小定为1MB .
				var slices;
        var totalSlices;
        var aaurl='http://192.168.95.134:8080/pmsserver/import/listData?sessionID=DB8B6E1542F54EF78021724721ADEE21'
				var url ='http://192.168.95.252:3000/api/pmsserver/api/user/logon';
				var input =document.createElement('input');
				input.type='file';
				input.click();
				input.addEventListener('change',function(){                       
					var blob=this.files[0];//文件数据                     
					var start = 0;//文件分割的起点
					var end;     //分割的终点
					var index = 0;
					// 计算文件切片总数
					slices = Math.ceil(blob.size / BYTES_PER_CHUNK);
					totalSlices= slices;//文件的总切片数
					while(start < blob.size) {
						end = start + BYTES_PER_CHUNK; 
						if(end > blob.size) {
							end = blob.size;
						}
						uploadFile(blob, index, start, end);
						start = end;
						index++;
						// if ( index>=totalSlices )
						//  layer.msg('完成')
						// location="reboot.htm";
					}
				},false);

			   
				// function sendRequest(){
					  
				// }
				function uploadFile(blob, index, start, end){
					var xhr;
					var fd;
					var chunk;  
					var sliceIndex=blob.name+index;
					chunk =blob.slice(start,end);//切割文件 
					fd = new FormData();
          fd.append("UpgradeFileName", chunk, sliceIndex);
          fd.append('sessionID','DB8B6E1542F54EF78021724721ADEE21');
          var xhr = new XMLHttpRequest();
         
          xhr.open('POST', url, false);//false指同步上传，因为我的服务器内存较小，选择同步，如果追求速度，可以选择 //ture，异步上传
          xhr.setRequestHeader('Access-Control-Allow-Origin','*');
					xhr.send(fd);
					// if((xhr.status >=200 && xhr.status < 300) || xhr.status == 304){
					// 	setTimeout("",10);
					// }else{
					// 	uploadFile(blob, index, start, end);
					// }
				}
    }
  }
}
</script>

<style>
.box-body{
	width:100%;
	height:100%;
	background:#030d26;
}
</style>