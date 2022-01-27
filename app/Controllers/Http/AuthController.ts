import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import LoginValidator from 'App/Validators/LoginValidator'
import User from 'App/Models/User'
import Firebase from 'App/Services/Firebase'
import Logger from '@ioc:Adonis/Core/Logger'

export default class AuthController {
  public async login(ctx: HttpContextContract): Promise<void> {
    const trx = await Database.transaction()

    try {
      const validator = new LoginValidator()
      const payload = await ctx.request.validate(validator)

      const firebaseUser = await AuthController.getFirebaseUser(payload.token)
      if (!firebaseUser) {
        await trx.rollback()
        return ctx.response.badRequest()
      }

      const uid = firebaseUser.uid

      let user = await User.getUser(uid, trx)
      if (!user) {
        user = await User.createUser(uid, trx)
      }

      await trx.commit()

      return ctx.response.send(user.uid)
    } catch (e) {
      Logger.error(e.messages)
      await trx.rollback()
      return ctx.response.badRequest()
    }
  }

  private static async getFirebaseUser(token: string) {
    try {
      const decode = await Firebase.getApp().auth().verifyIdToken(token)
      return await Firebase.getApp().auth().getUser(decode.uid)
    } catch (e) {
      return null
    }
  }
}
