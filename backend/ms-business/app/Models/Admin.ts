import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Headquarter from './Headquarter'

export default class Admin extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public headquarter_id: number

  @column()
  public direction: string

  @belongsTo(() => Headquarter,{
    foreignKey: 'headquarter_id'
  })
  public headquarter: BelongsTo<typeof Headquarter>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
