import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Executionservice from './Executionservice'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public description:string

  @column()
  public rating:number

  @belongsTo(() => Executionservice, {
    foreignKey: 'executionservice_id'
  })
  public executionservice: BelongsTo<typeof Executionservice>

  @column.dateTime({ autoCreate: true })
  public date_comment: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
