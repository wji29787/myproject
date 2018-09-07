import LayerMsg from './layermsg/index';
import Loading from './layerloading/index';


const install =function(Vue){
    if(install.installed){
        return;
    }
    const ComponentMsg=Vue.extend(
        LayerMsg.name? LayerMsg:LayerMsg.default
    )
    const ComponentLoading=Vue.extend(
        Loading.name? Loading:Loading.default
    )
    Vue.component(ComponentMsg.options.name,ComponentMsg);
    Vue.component(ComponentLoading.options.name,ComponentLoading);
    Vue.prototype[`$${ComponentMsg.options.name}`]= new ComponentMsg({
        el:document.createElement(ComponentMsg.options.tag || 'div')
    })
    Vue.prototype[`$${ComponentLoading.options.name}`]= new ComponentLoading({
        el:document.createElement(ComponentLoading.options.tag || 'div')
    })
    install.installed=true;
}
install.installed= false;
if(typeof window !=='undefined'&& window.Vue){
    install(window.Vue);
}

export default install