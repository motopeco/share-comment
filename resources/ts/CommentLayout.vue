<script lang="ts">
import { defineComponent, inject } from 'vue'
import { getAuth, onAuthStateChanged, signInAnonymously, signOut } from '@firebase/auth'
import firebase from '@/plugins/firebase'
import { useStore } from 'vuex'
import { key } from '@/vuex'
import { login } from '@/models/auth'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'CommentLayout',
  setup() {
    const $q = useQuasar()
    const store = useStore(key)
    const axios: any = inject('axios')

    const firebaseAuth = getAuth(firebase.app)

    onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        const name = await login($q, user.uid, axios)
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
  <div class="row">
    <div class="col-12">
      <q-bar class="bg-black text-white">
        <q-btn dense flat />
        <div class="text-weight-bold">
          App
        </div>
        <div class="cursor-pointer gt-md">File</div>
        <div class="cursor-pointer gt-md">Edit</div>
        <div class="cursor-pointer gt-md">View</div>
        <div class="cursor-pointer gt-md">Window</div>
        <div class="cursor-pointer gt-md">Help</div>
        <q-space />
        <q-btn dense flat icon="airplay" class="gt-xs" />
        <q-btn dense flat icon="battery_charging_full" />
        <q-btn dense flat icon="wifi" />
        <div>9:41</div>
        <q-btn dense flat icon="search" />
        <q-btn dense flat icon="list" />
      </q-bar>
    </div>
    <div class="col-12">
      <router-view />
    </div>
  </div>
</template>
