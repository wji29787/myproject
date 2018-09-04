<template>
    <transition name="fade">
        <div :class ="[layerMsg,shown? 'l-msg-show':'l-msg-hide']" :style="style">
            {{text}}
        </div>
    </transition>
</template>
<script>
const defaults={
    autohide:true,
    shown:false,
    time:3000,
    icon:'',
    style:'',
    layerMsg:'layer-msg'
}
export default {
    name:'layerMsg',
    data(){
        return {
            ...Object.assign({},defaults),
            text:'',
            timer:null,
        }
    },
    created(){
        this.inited=false;
    },
    mounted(){
        // this.close()
    },
    methods:{
        // close(){
        //     var _this=this;
        //     window.setTimeout(()=>{
        //         _this.isShow=false;
        //     },this.time);
        // }
        init(){
            document.body.appendChild(this.$el);
            this.inited=true;
        },
        config(cfg){
            cfg = Object.assign({},defaults,cfg);
            for(const prop in cfg){
                if(Object.prototype.hasOwnProperty.call(cfg,prop)){
                    this[prop]=cfg[prop];
                }
            }
        },
        destroy(){
            document.body.removeChild(this.$el);
            this.inited=false;
        },
        show(opt){
            if(!this.inited){
                this.init();
            }
            if(typeof opt ==='string'){
                opt={
                    text:opt,
                };
            }
            clearTimeout(this.timer);
            this.config(opt);
            this.shown = true;
            if(!this.autohide){
                return;
            }
            this.timer=setTimeout(()=>{
                this.hide();
            },this.time);
        },
        hide(){
            this.shown =false;
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
    .l-msg-show{

    }
    .l-msg-hide{
        display: none;
    }
    .fade-enter-active,.fade-leave-active{
        transition: opacity .5s;
    }
    .fade-enter,.fade-leave-to{
        opacity: 0;
    }
</style>


