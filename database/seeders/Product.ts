import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Product from 'App/Models/Product'

export default class ProductSeeder extends BaseSeeder {
  public async run() {
    const productA = new Product()
    productA.time = 300
    productA.name = 'foobar'
    productA.prefix = 'あ'
    await productA.save()

    const productB = new Product()
    productB.time = 350
    productB.name = 'foobar2'
    productB.prefix = 'た'
    await productB.save()
  }
}
