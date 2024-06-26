import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Room from './Room'
import Service from './Service'

export default class Burial extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public location: string

  @column()
  public burial_type: string

  @column()
  public room_id: number | null

  @column()
  public service_id: number

  @belongsTo(() => Room, {
    foreignKey: 'room_id'
  })
  public room: BelongsTo<typeof Room>

  @belongsTo(() => Service, {
    foreignKey: 'service_id'
  })
  public service: BelongsTo<typeof Service>

  @column.dateTime()
  public burial_date: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
