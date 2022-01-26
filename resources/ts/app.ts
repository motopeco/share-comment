import * as Vue from 'vue'
import * as QuasarFramework from 'quasar'
import { Loading, Notify } from 'quasar'
import * as Japanese from 'quasar/lang/ja'
import * as MdiV6 from 'quasar/icon-set/mdi-v6'
import router from '@/router'
import { key, store } from '@/vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
//
const app = Vue.createApp({
  template: '<router-view></router-view>',
})

const Quasar = QuasarFramework.Quasar

Quasar.lang.set(Japanese.default)
Quasar.iconSet.set(MdiV6.default)

app.use(Quasar, {
  plugins: {
    Loading,
    Notify,
  },
})

app.use(router)
app.use(store, key)
app.use(VueAxios, axios)

app.provide('axios', app.config.globalProperties.axios)

app.mount('#app')
