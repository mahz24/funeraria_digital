import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Subscription from './Subscription'

export default class Bill extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public amount: number

  @column()
  public date: Date

  @column()
  public subscription_id: number

  @belongsTo(() => Subscription,{
    foreignKey: 'subscription_id'
  })
  public subscription: BelongsTo<typeof Subscription>


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
