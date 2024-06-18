import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Client from './Client'
import Plan from './Plan'
import Bill from './Bill'

export default class Subscription extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime()
  public activation_date: DateTime

  @column()
  public client_id:number

  @column()
  public plan_id:number

  @belongsTo(() => Client, {
    foreignKey: 'client_id'
  })
  public client: BelongsTo<typeof Client>

  @belongsTo(() => Plan, {
    foreignKey: 'plan_id'
  })
  public plan: BelongsTo<typeof Plan>

  @hasMany(() => Bill,{
    foreignKey: 'plan_id'
  })
  public bills: HasMany<typeof Bill>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
