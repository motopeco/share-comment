import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ListProductValidator from 'App/Validators/ListProductValidator'
import Logger from '@ioc:Adonis/Core/Logger'
import Product from 'App/Models/Product'

export default class ProductController {
  public async index(ctx: HttpContextContract) {
    try {
      const validator = new ListProductValidator()
      const payload = await ctx.request.validate(validator)

      const products = await Product.getAllProduct(payload.prefix)

      return ctx.response.send(products)
    } catch (e) {
      Logger.error(e.messages)
      return ctx.response.badRequest()
    }
  }
}
