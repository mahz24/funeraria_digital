import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Chat from './Chat'

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public content_message: string

  @belongsTo(() => Chat, {
    foreignKey: 'chats_id'
  })
  public chat: BelongsTo<typeof Chat>

  @column.dateTime({ autoCreate: true })
  public date_send: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
