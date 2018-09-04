import LayerMsg from './layermsg/index';


const install =function(Vue){
    if(install.installed){
        return;
    }
    const ComponentMsg=Vue.extend(
        LayerMsg.name? LayerMsg:LayerMsg.default
    )
    // Vue.component(LayerMsg.name,LayerMsg);
    // Vue.prototype.$layer_msg =LayerMsg.installMessage;
    Vue.component(ComponentMsg.options.name,ComponentMsg);
    Vue.prototype[`$${ComponentMsg.options.name}`]= new ComponentMsg({
        el:document.createElement(ComponentMsg.options.tag || 'div')
    })
    install.installed=true;
}
install.installed= false;
if(typeof window !=='undefined'&& window.Vue){
    install(window.Vue);
}

export default install