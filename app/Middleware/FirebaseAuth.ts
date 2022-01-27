import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Firebase from 'App/Services/Firebase'
import Logger from '@ioc:Adonis/Core/Logger'
import User from 'App/Models/User'

export default class FirebaseAuth {
  public async handle({ request, response, session }: HttpContextContract, next: () => Promise<void>) {
    const authHeader = request.header('Authorization')
    if (!authHeader) {
      return response.unauthorized('invalid header.')
    }

    const idToken = authHeader.replace('Bearer ', '')

    try {
      const decoded = await Firebase.getApp().auth().verifyIdToken(idToken, true)
      const uid = decoded.uid
      const user = await User.getUser(uid)
      if (!user) {
        return response.unauthorized('user not found.')
      }

      request.all().userId = user.id

      await next()
    } catch (e) {
      Logger.error(e.messages)
      return response.unauthorized('auth failed.')
    }
  }
}
