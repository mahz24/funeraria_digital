import { DateTime } from 'luxon'
import { BaseModel, HasMany, HasOne, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Holder from './Holder'
import Benefactor from './Benefactor'
import Executionservice from './Executionservice'
import Subscription from './Subscription'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: string

  @column()
  public direction:string

  @column()
  public gender:string

  @column()
  public is_alive: boolean

  @hasOne(() => Holder,{
    foreignKey: 'client_id'
  })
  public holder: HasOne<typeof Holder>

  @hasOne(() => Benefactor,{
    foreignKey: 'client_id'
  })
  public benefactor: HasOne<typeof Benefactor>

  @hasMany(() => Executionservice,{
    foreignKey: 'client_id'
  })
  public executionservices: HasMany<typeof Executionservice>

  @hasMany(() => Subscription,{
    foreignKey: 'client_id'
  })
  public subscriptions: HasMany<typeof Subscription>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
