import { Axios } from 'axios'
import { QVueGlobals } from 'quasar'

export async function login($q: QVueGlobals, uid: string, axios: Axios) {
  try {
    $q.loading.show()

    const result = await axios.post('/api/v1/login', { firebaseUID: uid })
    return result.data
  } catch (e) {
    return null
  } finally {
    $q.loading.hide()
  }
}
