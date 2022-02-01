import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import StoreCommentValidator from 'App/Validators/StoreCommentValidator'
import Product from 'App/Models/Product'
import Comment from 'App/Models/Comment'
import Logger from '@ioc:Adonis/Core/Logger'

export default class CommentController {
  public async index(ctx: HttpContextContract) {
    try {
      const productId = ctx.params.productId
      const product = await Product.getProduct(productId)
      if (!product) {
        return ctx.response.notFound()
      }

      const comments = await Comment.getByProductId(product.id)
      return ctx.response.send(comments)
    } catch (e) {
      Logger.error(e.messages)
      return ctx.response.badRequest()
    }
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

      const comment = await Comment.createComment(
        userId,
        product.id,
        payload.content,
        payload.time,
        trx
      )

      await trx.commit()

      return ctx.response.send(comment)
    } catch (e) {
      Logger.error(e.messages)
      await trx.rollback()
      return ctx.response.badRequest()
    }
  }
}
