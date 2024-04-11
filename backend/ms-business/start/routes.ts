

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

import './routes/service'
import './routes/comment'
import './routes/room'
import './routes/message'