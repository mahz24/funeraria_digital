import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Message from './Message'
import Executionservice from './Executionservice'

export default class Chat extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name:string

  @column()
  public status:string

  @hasMany(() => Message, {
    foreignKey: 'chat_id'
  })
  public messages: HasMany<typeof Message>

  @belongsTo(() => Executionservice,{
    foreignKey: 'holder_id'
  })
  public executionservice: BelongsTo<typeof Executionservice>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
