import Vue from 'vue'
import App from './App'
import GlobalData from './components/global'

Vue.config.productionTip = false

Vue.prototype.$GlobalData = GlobalData

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
