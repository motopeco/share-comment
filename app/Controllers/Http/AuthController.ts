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

      const isFirebaseUid = await AuthController.isExistFirebaseUser(payload.firebaseUID)
      if (!isFirebaseUid) {
        await trx.rollback()
        return ctx.response.badRequest()
      }

      let user = await User.getUser(payload.firebaseUID, trx)
      if (!user) {
        user = await User.createUser(payload.firebaseUID, trx)
      }

      await trx.commit()

      return ctx.response.send(user.uid)
    } catch (e) {
      Logger.error(e.messages)
      await trx.rollback()
      return ctx.response.badRequest()
    }
  }

  private static async isExistFirebaseUser(uid: string) {
    try {
      await Firebase.getApp().auth().getUser(uid)
      return true
    } catch (e) {
      return false
    }
  }
}
