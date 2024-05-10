import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Client from './Client'
import Plan from './Plan'

export default class Subscription extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public activation_date: Date

  @column()
  public client_id: number

  @column()
  public plan_id: number

  @belongsTo(() => Client, {
    foreignKey: 'client_id'
  })
  public client: BelongsTo<typeof Client>

  @belongsTo(() => Plan, {
    foreignKey: 'plan_id'
  })
  public plan: BelongsTo<typeof Plan>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
