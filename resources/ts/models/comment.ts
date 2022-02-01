import { Ref } from 'vue'
import { Axios } from 'axios'
import { number } from '@adonisjs/env/build/src/Schema/number'
import { Store } from 'vuex'

export async function getComments(productId: number, axios: Axios) {}

export function getCreateComment(
  productId: number,
  content: Ref<string>,
  time: Ref<number>,
  isDisable: Ref<boolean>,
  comments: Ref<ProductComment[]>,
  axios: Axios,
  store: Store<any>
) {
  return async function () {
    try {
      isDisable.value = true

      await axios.post(
        `/api/v1/products/${productId}/comments`,
        {
          content: content.value,
          time: time.value,
        },
        {
          headers: {
            Authorization: `Bearer ${store.state.token}`,
          },
        }
      )

      content.value = ''

      const { data: commentResult } = await axios.get(`/api/v1/products/${productId}/comments`)
      comments.value = commentResult
    } catch (e) {
      console.log(e)
    } finally {
      isDisable.value = false
    }
  }
}
