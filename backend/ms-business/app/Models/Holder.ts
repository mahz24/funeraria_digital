import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Client from './Client'
import Benefactor from './Benefactor'

export default class Holder extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public client_id: number

  @belongsTo(() => Client, {
    foreignKey: 'client_id'
  })
  public client: BelongsTo<typeof Client>

  @hasMany(() => Benefactor, {
    foreignKey: 'holder_id'
  })
  public benefactors: HasMany<typeof Benefactor>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
