import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Client from './Client'
import Holder from './Holder'

export default class Benefactor extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public isprincipal_benefactor: boolean

  @column()
  public isemergency_contact: boolean

  @belongsTo(() => Client,{
    foreignKey: 'client_id'
  })
  public client: BelongsTo<typeof Client>

  @belongsTo(() => Holder,{
    foreignKey: 'holder_id'
  })
  public holder: BelongsTo<typeof Holder>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
