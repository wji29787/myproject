import Vue from 'vue'
import Message from './main.vue';
let optParam=function(opt){
    var options;
    for(let prop in opt){
        if(opt.hasOwnProperty(prop)){
            let value = opt[prop];
            if(typeof value ==='function'){
                    options.myMixin={
                        created () {
                            this[prop]();
                        },
                        methods: {
                            [prop]:value
                        }
                    }
            }else{
                options.data[prop]=value;
            }
        }
    }
    return options;
}
Message.installMessage=function(element,options){
    var el;
    if(arguments.length===0){
        el=$(document);
        options.data={
            message :''
        }
       
    }
    if(arguments.length===1){
        el=$(document);
        if(typeof element ==='string'|| typeof element ==='number'){
            options.data ={
                message :element
            }
            
        }
        options=optParam(element);   
    }
    if(arguments.length>1){
        el=$(element);
        if(typeof options ==='string'|| typeof options ==='number'){
            options.data ={
                message :options
            }
            
        }
        options=optParam(element); 

    }

    // if(options===undefined || options ===null){
       
    // } else if(typeof options ==='string'|| typeof options ==='number'){
    //     options ={
    //         message :options
    //     }
    // }
    
    if(options.myMixin){
        Message.mixins=[options.myMixin];
    }
    var message =Vue.extend(Message)
    var component =new message({
        data:options.data
    }).$mount();
    el.append(component.$el);
}
export default Message
