import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Service from './Service'
import Client from './Client'
import Comment from './Comment'

export default class Executionservice extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @belongsTo(() => Service, {
    foreignKey: 'service_id'
  })
  public service: BelongsTo<typeof Service>

  @belongsTo(() => Client, {
    foreignKey: 'client_id'
  })
  public client: BelongsTo<typeof Client>

  @column()
  public end_date: DateTime

  @hasMany(() => Comment, {
    foreignKey: 'comment_id'
  })
  public comments: HasMany<typeof Comment>

  

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
