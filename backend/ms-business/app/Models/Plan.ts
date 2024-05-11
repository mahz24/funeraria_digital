import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import PlanXService from './PlanXService'
import Subscription from './Subscription'

export default class Plan extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name:String

  @column()
  public description:String

  @column()
  public price: number

  @column()
  public beneficiaries_number:number

  @column()
  public discount:number

  @hasMany(() => Subscription,{
    foreignKey: 'plan_id'
  })
  public subscriptions: HasMany<typeof Subscription>

  @hasMany(() => PlanXService,{
    foreignKey: 'plan_id'
  })
  public planservices: HasMany<typeof PlanXService>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
