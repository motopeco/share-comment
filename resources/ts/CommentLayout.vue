<script lang="ts">
import { defineComponent, inject } from 'vue'
import { getAuth, onAuthStateChanged, signInAnonymously, signOut } from '@firebase/auth'
import firebase from '@/plugins/firebase'
import { useStore } from 'vuex'
import { key } from '@/vuex'
import { login } from '@/models/auth'
import { useQuasar } from 'quasar'
import { Axios } from 'axios'

export default defineComponent({
  name: 'CommentLayout',
  setup() {
    const $q = useQuasar()
    const store = useStore(key)
    const axios: any = inject('axios')

    const firebaseAuth = getAuth(firebase.app)

    onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        const token = await user.getIdTokenResult()

        const name = await login($q, token.token, axios)
        if (name) {
          store.commit('login', { uid: user.uid, name })
        }
      } else {
        store.commit('logout')
      }
    })

    const logout = () => {
      signOut(firebaseAuth)
    }

    const signIn = async () => {
      $q.loading.show()
      await signInAnonymously(firebaseAuth)
    }

    return {
      store,
      logout,
      signIn,
    }
  },
})
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Title
        </q-toolbar-title>
        <q-space />
        <span v-if="store.state.isLogin">@{{ store.state.name }}</span>
        <q-btn v-if="store.state.isLogin" stretch flat label="ログアウト" @click="logout" />
        <q-btn v-else stretch flat label="ログイン" @click="signIn" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
