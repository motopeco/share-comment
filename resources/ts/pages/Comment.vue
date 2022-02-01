<script lang="ts">
import { defineComponent, inject, onBeforeMount, ref, watch, watchEffect } from 'vue'
import { getProductData } from '@/models/product'
import { useQuasar } from 'quasar'
import { LocationQuery, useRoute } from 'vue-router'
import {
  getIsDisable,
  getMyTweak,
  getTimerFormat,
  getTogglePlay,
  getWatchComment,
} from '@/models/commentPage'
import { key, ProductData } from '@/vuex'
import { useStore } from 'vuex'
import { getCreateComment } from '@/models/comment'

export default defineComponent({
  name: 'CommentPage',
  setup: function () {
    const comments = ref<ProductComment[]>([])
    const $q = useQuasar()
    const axios: any = inject('axios')
    const $route = useRoute()
    const $store = useStore(key)
    const query = $route.query as LocationQuery
    const productId = parseInt(query.productId as string)

    const isPlayed = ref(false)
    const content = ref('')
    const time = ref(0)
    const maxTime = ref(0)
    const tmpHeight = ref(0)
    const boxHeight = ref('100vh')
    const myTweak = getMyTweak(tmpHeight, boxHeight)

    const isSending = ref(false)
    const isDisable = ref(false)
    watchEffect(() => {
      isDisable.value = getIsDisable($store, isSending)
    })

    const stopScroll = ref(false)

    watch(() => time.value, getWatchComment(stopScroll, tmpHeight))

    const togglePlay = getTogglePlay(isPlayed, time)

    const productData = getProductData($q, axios, productId, comments, maxTime)

    onBeforeMount(async () => {
      await productData()
    })

    const createComment = getCreateComment(
      productId,
      content,
      time,
      isDisable,
      comments,
      axios,
      $store
    )

    const enterKeyboard = async (event) => {
      if (event.keyCode !== 13) return
      await createComment()
    }

    return {
      isPlayed,
      time,
      myTweak,
      boxHeight,
      maxTime,
      togglePlay,
      getTimerFormat,
      comments,
      stopScroll,
      isDisable,
      content,
      createComment,
      enterKeyboard,
    }
  },
})
</script>

<template>
  <q-page class="column full-height" :style-fn="myTweak">
    <div class="col">
      <div id="comment-box" style="overflow-y: scroll" :style="{ height: boxHeight }">
        <q-list separator @mouseenter="stopScroll = true" @mouseleave="stopScroll = false">
          <q-item
            v-for="(comment, i) of comments"
            :key="i"
            v-ripple
            class="comments"
            clickable
            :data-time="comment.time"
            :data-index="i"
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
      </div>
    </div>
    <div class="col-auto">
      <div
        class="row q-pl-md q-pr-md q-pt-md"
        style="border-top: 1px solid grey; border-bottom: 1px solid grey"
      >
        <div class="col-auto">
          <q-btn
            round
            color="primary"
            :icon="isPlayed ? 'mdi-stop' : 'mdi-play'"
            @click="togglePlay"
          />
        </div>
        <div class="col">
          <div class="column">
            <div class="col">
              <div class="q-ml-lg q-mt-sm">
                <q-slider v-model="time" :min="0" :max="maxTime" />
              </div>
            </div>
            <div class="col text-center">
              {{ getTimerFormat(time) }} - {{ getTimerFormat(maxTime) }}
            </div>
          </div>
        </div>
      </div>
      <div class="row q-mb-sm q-mt-sm">
        <div class="col">
          <q-input
            v-model="content"
            :disable="isDisable"
            class="q-ml-md"
            color="white"
            bg-color="white"
            square
            placeholder="コメント"
            @keydown.enter="enterKeyboard"
          />
        </div>
        <div class="col-auto">
          <q-btn
            :disable="isDisable"
            color="primary"
            unelevated
            class="full-height q-mr-md"
            style="width: 100px"
            @click="createComment"
          >
            送信
          </q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>
