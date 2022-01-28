<script lang="ts">
import { defineComponent, inject, ref } from 'vue'
import { useQuasar } from 'quasar'
import { getProducts } from '@/models/product'
import { getAuth } from '@firebase/auth'
import firebase from '@/plugins/firebase'

export default defineComponent({
  name: 'ProductList',
  setup() {
    const $q = useQuasar()
    const axios: any = inject('axios')
    const rows = ref<any[]>([])

    const kana = 'あかさたなはまやらわ'.split('')

    const firebaseAuth = getAuth(firebase.app)

    const products = getProducts($q, axios, rows)

    // await products()

    return {
      rows,
      kana,
    }
  },
})
</script>

<template>
  <q-list separator>
    <q-item v-for="(kana, i) of kana" :key="i">
      <q-item-section>{{ kana }}</q-item-section>
    </q-item>
  </q-list>
</template>
