import { createStore, Store } from 'vuex'
import { InjectionKey } from 'vue'
import { boolean } from '@adonisjs/env/build/src/Schema/boolean'

export interface ProductData {
  id: number
  name: string
  time: number
  prefix: string
}

export interface State {
  isLogin: boolean
  uid: string
  name: string
  token: string
  products: ProductData[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    isLogin: false,
    uid: '',
    name: '',
    token: '',
    products: [],
  },
  mutations: {
    login(state, data: { uid: string; name: string, token: string }) {
      state.isLogin = true
      state.uid = data.uid
      state.name = data.name
      state.token = data.token
    },
    logout(state) {
      state.isLogin = false
      state.uid = ''
      state.name = ''
      state.token = ''
    },
    setProducts(state, products) {
      state.products = products
    },
  },
})
