<script lang="ts">
import { defineComponent, inject, onBeforeMount, onMounted, ref, watch } from 'vue'
import CommentBox from '@/components/CommentBox.vue'
import { Axios } from 'axios'
import { getProductData } from '@/models/product'
import { useQuasar } from 'quasar'
import { LocationQuery, LocationQueryValue, useRoute } from 'vue-router'
import { number } from '@adonisjs/env/build/src/Schema/number'

export default defineComponent({
  name: 'CommentPage',
  components: {
    CommentBox,
  },
  setup: function () {
    const comments = ref<ProductComment[]>([])
    const $q = useQuasar()
    const axios: any = inject('axios')
    const $route = useRoute()
    const isPlayed = ref(false)
    const time = ref(0)
    const maxTime = ref(0)
    const tmpHeight = ref(0)
    const boxHeight = ref('100vh')
    const myTweak = (offset, height) => {
      tmpHeight.value = height - offset - 155
      boxHeight.value = `${height - offset - 155}px`

      return {
        minHeight: `${height - offset}px`,
      }
    }

    const stopScroll = ref(false)

    watch(
      () => time.value,
      (newValue) => {
        if (stopScroll.value) return

        const elm = document.getElementById('comment-box')
        if (!elm) return
        // console.log(elm.scrollHeight, elm.scrollTop)

        const commentElms = document.getElementsByClassName('comments')
        const elms = Array.from(commentElms).filter((commentElm: HTMLElement) => {
          const tn: string | undefined = commentElm.dataset.time
          if (tn) {
            return newValue === parseInt(tn)
          } else {
            return false
          }
        })

        if (elms.length === 0) return

        const lastElm = elms[elms.length - 1] as HTMLElement
        const lastIndex = parseInt(lastElm.dataset.index || '0')

        const height = Array.from(commentElms)
          .filter((elm: HTMLElement) => {
            const i = elm.dataset.index
            if (!i) return false

            const index = parseInt(i)
            return lastIndex >= index
          })
          .reduce((sum: number, elm: HTMLElement) => {
            return sum + elm.offsetHeight
          }, 0)

        console.log(height)

        elm.scrollTo({ top: height - tmpHeight.value })
      }
    )

    const timer = ref(-1)

    const togglePlay = () => {
      if (isPlayed.value) {
        window.clearInterval(timer.value)
      } else {
        timer.value = window.setInterval(() => {
          if (isPlayed.value) {
            time.value++
          }
        }, 1000)
      }

      isPlayed.value = !isPlayed.value
    }

    const getTimerFormat = (value: number) => {
      const min = ('0' + Math.floor(value / 60)).slice(-2)
      const sec = ('0' + (value % 60)).slice(-2)

      return `${min}:${sec}`
    }

    const query = $route.query as LocationQuery
    const productId = query.productId as string
    const productData = getProductData($q, axios, parseInt(productId), comments, maxTime)

    onBeforeMount(async () => {
      await productData()
    })

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
    }
  },
})
</script>

<template>
  <q-page class="column full-height" :style-fn="myTweak">
    <div class="col">
      <div id="comment-box" style="overflow-y: scroll" :style="{ height: boxHeight }">
        <Suspense>
          <CommentBox />
        </Suspense>
        <q-list separator @mouseenter="stopScroll = true" @mouseleave="stopScroll = false">
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
          <q-input class="q-ml-md" color="white" bg-color="white" square placeholder="コメント" />
        </div>
        <div class="col-auto">
          <q-btn color="primary" unelevated class="full-height q-mr-md" style="width: 100px">
            送信
          </q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>
