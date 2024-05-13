import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Admin from './Admin'
import City from './City'

export default class Headquarter extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public direction: string

  @column()
  public description: string

  @column()
  public status: number

  @column()
  public city_id: number

  @hasMany(() => Admin, {
    foreignKey: 'headquarter_id'
  })
  public admin: HasMany<typeof Admin>

  @belongsTo(() => City, {
    foreignKey: 'city_id'
  })
  public city: BelongsTo<typeof City>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
