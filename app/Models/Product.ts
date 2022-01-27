import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { TransactionClientContract } from '@ioc:Adonis/Lucid/Database'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static async getProduct(
    id: number,
    trx?: TransactionClientContract
  ): Promise<Product | undefined> {
    const query = Product.query().where('id', id)
    if (trx) {
      query.useTransaction(trx)
    }

    const products = await query
    return products[0]
  }
}
