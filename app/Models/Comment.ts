import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { TransactionClientContract } from '@ioc:Adonis/Lucid/Database'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public time: number

  @column()
  public userId: number

  @column()
  public content: string

  @column()
  public isBan: boolean

  @column()
  public ngLevel: boolean

  @column()
  public productId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static async createComment(
    userId: number,
    productId: number,
    content: string,
    time: number,
    trx: TransactionClientContract
  ): Promise<Comment> {
    const comment = new Comment()
    comment.userId = userId
    comment.productId = productId
    comment.content = content
    comment.time = time
    comment.useTransaction(trx)
    await comment.save()

    return comment
  }

  public static async getByProductId(productId: number) {
    return Comment.query().where('product_id', productId).orderBy('time')
  }
}
