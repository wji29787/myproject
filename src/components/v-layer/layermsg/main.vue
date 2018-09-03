<template>
    <transition name="fade">
        <div class ="layer-msg" v-if="isShow">
            {{message}}
        </div>
    </transition>
</template>
<script>
export default {
    name:'layer-msg',
    data(){
        return {
            message:'',
            time:3000,
            isShow:true
        }
    },
    mounted(){
        this.close()
    },
    methods:{
        close(){
            var _this=this;
            window.setTimeout(()=>{
                _this.isShow=false;
            },this.time);
        }
    }
    
}
</script>
<style>
    .layer-msg{
        position: fixed;
        padding: 10px;
        color: #fff;
        background-color: #5F6161;
        border-radius: 4px;
        top:50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 999999999
    }
    .fade-enter-active,.fade-leave-active{
        transition: opacity .5s;
    }
    .fade-enter,.fade-leave-to{
        opacity: 0;
    }
</style>


