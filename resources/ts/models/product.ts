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
