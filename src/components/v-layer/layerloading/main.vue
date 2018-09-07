<template>
    <transition name="fade">
        <div class="loading-box" :class ="[loadStyle,shown? 'l-load-show':'l-load-hide']">
            <img :src="imgUrl" alt="" :class ="[isShow? 'l-load-show':'l-load-hide']" >
        </div>
    </transition>
</template>
<script>
const defaults={
    // autohide:true,
    shown:false,
    loadStyle:'l-load-style-doc',
    imgUrl:require('./loding1.gif'),
    isShow:true,
}
export default {
    name:'loading',
    data(){
        return {
            ...Object.assign({},defaults),
            element:''
        }
    },
    created(){
        this.inited=false;
    },
    methods:{
        init(el){
            this.element=el;
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
            this.element.removeChild(this.$el);
            this.inited=false;
        },
        show(el){
            if(el){
                defaults.loadStyle='l-load-style-el';
                if( !el.style.position){
                    el.style.position ='relative';
                }
            }else{
                el =document.body;
            }
            this.config();
            if(!this.inited){
                this.init(el);
            }                    
            this.shown = true;
        },
        hide(){
            this.shown =false;
            this.destroy();
        },
        showng(el){
            this.show(el);
            this.isShow=false;

        }
    }
    
}
</script>
<style>
    .loading-box{      
        z-index: 998;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.3);
    }
    .loading-box img{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 0.5rem;
        height: 0.5rem;
    }
    .l-load-style-doc{
        position: fixed;      
    }
    .l-load-style-el{
        position: absolute;
    }
    .l-load-show{

    }
    .l-load-hide{
        display: none;
    }
    .fade-enter-active,.fade-leave-active{
        transition: opacity .5s;
    }
    .fade-enter,.fade-leave-to{
        opacity: 0;
    }
</style>


