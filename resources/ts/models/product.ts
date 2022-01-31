import { Axios } from 'axios'
import { QVueGlobals } from 'quasar'
import { Ref } from 'vue'
import { getAuth } from '@firebase/auth'
import firebase from '@/plugins/firebase'

export function getProducts($q: QVueGlobals, axios: Axios, rows: Ref<any[]>) {
  return async function () {
    try {
      $q.loading.show()

      const result = await axios.get('/api/v1/products', {
        params: {
          prefix: '-',
        },
      })
      rows.value = result.data
    } catch (e) {
      console.log(e)
    } finally {
      $q.loading.hide()
    }
  }
}
//
export function getProductData(
  $q: QVueGlobals,
  axios: Axios,
  productId: number,
  refComments: Ref<ProductComment[]>,
  refTime: Ref<number>
) {
  return async function () {
    try {
      $q.loading.show()

      const { data: product } = await axios.get(`/api/v1/products/${productId}`)
      console.log(`/api/v1/products/${product.id}/comments`)
      const { data: comments } = await axios.get(`/api/v1/products/${product.id}/comments`)

      refTime.value = product.time
      refComments.value = comments
    } catch (e) {
      console.log(e)
    } finally {
      $q.loading.hide()
    }
  }
}
