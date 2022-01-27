import { Ref } from 'vue'
import { Axios } from 'axios'

export async function getComments(productId: number, axios: Axios) {}

export async function createComment(content: Ref<string>, time: Ref<number>, isDisable: Ref<boolean>, axios: Axios) {
  try {
    isDisable.value = true
  } finally {
    isDisable.value = false
  }
}
