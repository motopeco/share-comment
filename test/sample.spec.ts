import test from 'japa'
import Env from '@ioc:Adonis/Core/Env'
import Application from '@ioc:Adonis/Core/Application'
import Firebase from 'App/Services/Firebase'

test('sample', async (assert) => {
  const app = Firebase.getApp()
  const user = await app.auth().getUser('kCflsSNDWrc7AhMTWszaSWC1UOj12')
  console.log(user)
})
