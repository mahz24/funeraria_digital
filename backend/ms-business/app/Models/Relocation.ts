import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Service from './Service'

export default class Relocation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public location: string

  @column()
  public status: number

  @column()
  public departure_time: DateTime

  @column()
  public arrival_time: DateTime

<<<<<<< HEAD
  @belongsTo(() => Service,{
    foreignKey: 'service_id'
  })
  public service_id: BelongsTo<typeof Service>
=======
  @belongsTo(() => Service, {
    foreignKey: 'service_id'
  })
  public service: BelongsTo<typeof Service>
>>>>>>> de59c15b4777de9dac287dbd9f5d8aabbaca0a57

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
