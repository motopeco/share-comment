import { createStore, Store } from 'vuex'
import { InjectionKey } from 'vue'
import { boolean } from '@adonisjs/env/build/src/Schema/boolean'

export interface State {
  isLogin: boolean
  uid: string
  name: string
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    isLogin: false,
    uid: '',
    name: '',
  },
  mutations: {
    login(state, data: { uid: string; name: string }) {
      state.isLogin = true
      state.uid = data.uid
      state.name = data.name
    },
    logout(state) {
      state.isLogin = false
      state.uid = ''
      state.name = ''
    },
  },
})
