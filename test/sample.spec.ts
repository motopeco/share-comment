// import test from 'japa'
// import Env from '@ioc:Adonis/Core/Env'
// import Application from '@ioc:Adonis/Core/Application'
// import Firebase from 'App/Services/Firebase'
// import Database from '@ioc:Adonis/Lucid/Database'
// import Product from 'App/Models/Product'
// import Comment from 'App/Models/Comment'
// import { DateTime } from 'luxon'
//
// test('sample', async (assert) => {
//   // const app = Firebase.getApp()
//   // const user = await app.auth().getUser('kCflsSNDWrc7AhMTWszaSWC1UOj12')
//   // console.log(user)
// })
//
// test.group('Example', (group) => {
//   group.beforeEach(async () => {
//     await Database.beginGlobalTransaction()
//   })
//
//   group.afterEach(async () => {
//     await Database.rollbackGlobalTransaction()
//   })
//
//   test('page', async (assert) => {
//     const p1 = new Product()
//     p1.name = 'ドラえもん'
//     p1.prefix = 'タ'
//     p1.time = 10
//     await p1.save()
//
//     const c1 = new Comment()
//     c1.productId = p1.id
//     c1.userId = 1
//     c1.time = 10
//     c1.content = 'aaaaaaaa'
//     await c1.save()
//
//     const c2 = new Comment()
//     c2.productId = p1.id
//     c2.userId = 1
//     c2.time = 12
//     c2.content = 'bbbbbbbb'
//     await c2.save()
//
//     const products = await Product.getAllProduct()
//
//     const product = products[0]
//     const dt = new Date(product.last_at)
//
//     assert.equal(
//       DateTime.fromJSDate(dt).toFormat('DD hh:mm:ss SSS'),
//       c2.createdAt.toFormat('DD hh:mm:ss SSS')
//     )
//   })
//
//   test('products', async (assert) => {
//     const p1 = new Product()
//     p1.name = 'ドラえもん'
//     p1.prefix = 'タ'
//     p1.time = 10
//     await p1.save()
//
//     const p2 = new Product()
//     p2.name = 'ドラえもん2'
//     p2.prefix = 'タ'
//     p2.time = 10
//     await p2.save()
//
//     const products = await Product.getAllProduct()
//     console.log(products)
//   })
// })
//
