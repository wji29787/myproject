import LayerMsg from './layermsg/index';


const install =function(Vue){
    Vue.component(LayerMsg.name,LayerMsg);
    Vue.prototype.$layer_msg =LayerMsg.installMessage;
}

export default install