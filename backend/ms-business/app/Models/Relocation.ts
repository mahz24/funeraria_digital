import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Service from './Service'

export default class Relocation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public service_id: number

  @belongsTo(() => Service, {
    foreignKey: 'service_id'
  })
  public service: BelongsTo<typeof Service>

  @column()
  public location: string

  @column()
  public status: string

  @column.dateTime()
  public departure_time: DateTime

  @column.dateTime()
  public arrival_time: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
