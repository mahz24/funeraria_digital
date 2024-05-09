

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})
import "./routes/plan"
import "./routes/headquarters"
import "./routes/cities"
import "./routes/departments"
import "./routes/bills"

import './routes/service'
import './routes/comment'
import './routes/room'
import './routes/message'

import './routes/clients'
import './routes/admins'
import './routes/holders'
import './routes/benefactors'