<script lang="ts">
import { defineComponent, inject, onBeforeMount, onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'
import { getProducts } from '@/models/product'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { key } from '@/vuex'

export default defineComponent({
  name: 'ProductList',
  setup() {
    const $store = useStore(key)
    const $router = useRouter()
    const $q = useQuasar()
    const axios: any = inject('axios')
    const rows = ref<any[]>($store.state.products)

    const kana = 'あかさたなはまやらわ'.split('')

    const products = getProducts($q, axios, rows)

    onBeforeMount(async () => {
      await products()
      $store.commit('setProducts', rows.value)
      console.log(rows.value)
    })

    const getTimerFormat = (value: number) => {
      const min = ('0' + Math.floor(value / 60)).slice(-2)
      const sec = ('0' + (value % 60)).slice(-2)

      return `${min}:${sec}`
    }

    const moveToCommentPage = (row) => {
      $router.push({
        path: '/comments',
        query: {
          productId: row.id,
        },
      })
    }

    return {
      rows,
      kana,
      getTimerFormat,
      moveToCommentPage,
    }
  },
})
</script>

<template>
  <q-list v-for="(kana, i) of kana" :key="i" separator>
    <q-item>
      <q-item-section>{{ kana }}</q-item-section>
    </q-item>
    <q-item
      v-for="row of rows.filter((row) => row.prefix === kana)"
      :key="row.id"
      v-ripple
      clickable
      @click="moveToCommentPage(row)"
    >
      <q-item-section>
        <q-item-label>{{ row.name }}</q-item-label>
        <q-item-label caption lines="2"> 再生時間: {{ getTimerFormat(row.time) }} </q-item-label>
      </q-item-section>

      <q-item-section side top>
        <q-item-label caption> 最新のコメント投稿: {{ row.last_at }} </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>
