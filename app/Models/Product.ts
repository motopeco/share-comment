import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import Database, { TransactionClientContract } from '@ioc:Adonis/Lucid/Database'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public time: number

  @column()
  public prefix: string

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

  public static async getAllProduct(prefix: string) {
    const query = Database.query()
      .select('*')
      .from('products')
      .joinRaw(
        'LEFT JOIN ' +
          '(SELECT COUNT(id) as count, product_id, MAX(created_at) as last_at FROM comments GROUP BY product_id) as c ' +
          'ON c.product_id = products.id'
      )
      .orderBy(['prefix', 'name'])

    if (prefix !== '-') {
      query.where('prefix', prefix)
    }

    console.log(query.toQuery())

    return query
  }
}
