import { computed, Ref } from 'vue'
import { number } from '@adonisjs/env/build/src/Schema/number'
import { Store } from 'vuex'

export function getWatchComment(stopScroll: Ref<boolean>, tmpHeight: Ref<number>) {
  return function (newValue: number) {
    if (stopScroll.value) return

    const elm = document.getElementById('comment-box')
    if (!elm) return
    // console.log(elm.scrollHeight, elm.scrollTop)

    const commentElms = document.getElementsByClassName('comments')
    const elms = Array.from(commentElms).filter((commentElm: HTMLElement) => {
      const tn: string | undefined = commentElm.dataset.time
      if (tn) {
        return newValue >= parseInt(tn)
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
        console.log(elm.offsetHeight)
        return sum + elm.offsetHeight
      }, 0)

    elm.scrollTo({ top: height - tmpHeight.value })
  }
}

export function getTogglePlay(isPlayed: Ref<boolean>, time: Ref<number>) {
  let timer = -1

  return function () {
    if (isPlayed.value) {
      window.clearInterval(timer)
    } else {
      timer = window.setInterval(() => {
        if (isPlayed.value) {
          time.value++
        }
      }, 1000)
    }

    isPlayed.value = !isPlayed.value
  }
}

export function getTimerFormat(value: number) {
  const min = ('0' + Math.floor(value / 60)).slice(-2)
  const sec = ('0' + (value % 60)).slice(-2)

  return `${min}:${sec}`
}

export function getMyTweak(tmpHeight: Ref<number>, boxHeight: Ref<string>) {
  return function (offset, height) {
    tmpHeight.value = height - offset - 155
    boxHeight.value = `${height - offset - 155}px`

    return {
      minHeight: `${height - offset}px`,
    }
  }
}

export function getIsDisable(store: Store<any>, isSending: Ref<boolean>) {
  if (!store.state.isLogin) return true

  return isSending.value
}
