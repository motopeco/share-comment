import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import StoreCommentValidator from 'App/Validators/StoreCommentValidator'
import Product from 'App/Models/Product'
import Comment from 'App/Models/Comment'

export default class CommentController {
  public async index(ctx: HttpContextContract) {
    const { userId } = ctx.request.all()
    console.log(userId)

    return ctx.response.send('ok')
  }

  public async store(ctx: HttpContextContract) {
    const trx = await Database.transaction()

    try {
      const validator = new StoreCommentValidator()
      const payload = await ctx.request.validate(validator)
      const productId = ctx.params.productId as number
      const { userId } = ctx.request.all()

      const product = await Product.getProduct(productId, trx)
      if (!product) {
        await trx.rollback()
        return ctx.response.notFound()
      }

      await Comment.createComment(userId, product.id, payload.content, payload.time, trx)

      await trx.commit()
    } catch (e) {
      await trx.rollback()
    }
  }
}
