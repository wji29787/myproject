<template>
    <transition name="fade">
        <div class="l-msg-style" :class ="[layerMsg,shown? 'l-msg-show':'l-msg-hide']" :style="style">
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
    layerMsg:'l-msg-style-doc'
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
        init(el){
            el.appendChild(this.$el);
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
            var el,opts;
            if(arguments.length===1){
                el =document.body;
                opts=opt;
            }
            if(arguments.length>1){
                el=opt;
                opts = arguments[1];
                defaults.layerMsg='l-msg-style-el';
                el.style.position='relative';
            }
            if(!this.inited){
                this.init(el);
            }
            if(typeof opts ==='string'){
                opts={
                    text:opts,
                };
            }
            clearTimeout(this.timer);
            this.config(opts);
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
    .l-msg-style{
        padding: 10px;
        color: #fff;
        background-color: #5F6161;
        border-radius: 4px;
        top:50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 999999999
    }
    .l-msg-style-doc{
        position: fixed;      
    }
    .l-msg-style-el{
        position: absolute;
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


