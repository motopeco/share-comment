import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { TransactionClientContract } from '@ioc:Adonis/Lucid/Database'
import uid from 'uid/secure'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uid: string

  @column()
  public firebaseUID: string

  @column()
  public showNgLevel: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  /**
   * FirebaseのUIDから、ユーザを取得する。
   * @param firebaseUID
   * @param trx
   */
  public static async getUser(
    firebaseUID: string,
    trx: TransactionClientContract
  ): Promise<User | null> {
    const users = await User.query().useTransaction(trx).where('firebase_uid', firebaseUID)
    return users[0]
  }

  /**
   *
   * @param firebaseUID
   * @param trx
   */
  public static async createUser(firebaseUID: string, trx: TransactionClientContract) {
    const user = new User()
    user.useTransaction(trx)
    user.uid = uid.uid(11)
    user.firebaseUID = firebaseUID
    await user.save()

    return user
  }
}
