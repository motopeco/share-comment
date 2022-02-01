<script lang="ts">
import { defineComponent, inject } from 'vue'
import { getComments } from '@/models/comment'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    try {
      // const axios: any = inject('axios')
      // const $route = useRoute()
      // const productId = parseInt($route.query.product_id as string)
      // await getComments(productId, axios)
    } catch (e) {
      //
    }
  },
})
</script>

<template>
  <q-list separator>
    <q-item
      v-for="comment of comments"
      :key="comment.i"
      v-ripple
      class="comments"
      clickable
      :data-time="comment.time"
      :data-index="comment.i"
    >
      <q-item-section>
        <q-item-label>{{ comment.content }}</q-item-label>
      </q-item-section>
      <q-item-section side top>
        <q-item-label caption>
          {{ getTimerFormat(comment.time) }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>
