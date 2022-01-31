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

  public async detail(ctx: HttpContextContract) {
    try {
      const id = ctx.params.productId
      const product = await Product.getProduct(id)

      return ctx.response.send(product)
    } catch (e) {
      Logger.error(e.messages)
      return ctx.response.notFound()
    }
  }
}
