/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('login', 'AuthController.login')
  Route.get('/products', 'ProductController.index')
  Route.get('/products/:productId', 'ProductController.detail')
  Route.get('/products/:productId/comments', 'CommentController.index')
}).prefix('/api/v1')

Route.group(() => {
  Route.post('/products/:productId/comments', 'CommentController.store')
}).prefix('/api/v1').middleware(['firebaseAuth'])

Route.get('*', async ({ view }) => {
  return view.render('welcome')
})
