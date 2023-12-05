import Vue from 'vue'
import App from './App.vue'
import Table from 'ant-design-vue'
import Icon from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

Vue.use(VXETable)
Vue.use(Table)
Vue.use(Icon)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
