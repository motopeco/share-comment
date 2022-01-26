<script lang="ts">
import { defineComponent } from 'vue'
import firebase from '@/plugins/firebase'
import { getAuth, signInAnonymously } from '@firebase/auth'
import AppNavbar from '@/components/AppNavbar.vue'

export default defineComponent({
  name: 'LoginPage',
  components: {
    AppNavbar,
  },
  setup() {
    const auth = getAuth(firebase.app)

    return {
      login: async () => {
        const result = await signInAnonymously(auth)
        console.log(result)
      },
    }
  },
})
</script>

<template>
  <div>
    <AppNavbar></AppNavbar>
    <section class="section">
      <div class="container">
        <h1 class="title">ログイン</h1>
        <p class="subtitle">hello</p>
      </div>
    </section>
  </div>
</template>
