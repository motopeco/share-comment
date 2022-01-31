import { Axios } from 'axios'
import { QVueGlobals } from 'quasar'

export async function login($q: QVueGlobals, token: string, axios: Axios) {
  try {
    // $q.loading.show()

    const result = await axios.post('/api/v1/login', { token })
    return result.data
  } catch (e) {
    return null
  } finally {
    // $q.loading.hide()
  }
}
