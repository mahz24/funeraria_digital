import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, HasOne, belongsTo, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Service from './Service'
import Client from './Client'
import Comment from './Comment'
import Chat from './Chat'

export default class Executionservice extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public service_id: number

  @column()
  public client_id: number

  @belongsTo(() => Service, {
    foreignKey: 'service_id'
  })
  public service: BelongsTo<typeof Service>

  @belongsTo(() => Client, {
    foreignKey: 'client_id'
  })
  public client: BelongsTo<typeof Client>

  @column.dateTime()
  public end_date: DateTime

  @hasMany(() => Comment, {
    foreignKey: 'executionservice_id'
  })
  public comments: HasMany<typeof Comment>

  @hasOne(() => Chat,{
    foreignKey: 'executionservice_id'
  })
  public chat: HasOne<typeof Chat>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
