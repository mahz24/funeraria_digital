import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, HasOne, belongsTo, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Admin from './Admin'
import City from './City'
import Room from './Room'
import Driver from './Driver'

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
  public status: string

  @column()
  public city_id: number

  @hasMany(() => Driver, {
    foreignKey: 'headquarter_id'
  })
  public drivers: HasMany<typeof Driver>

  @hasOne(() => Admin, {
    foreignKey: 'headquarter_id'
  })
  public admin: HasOne<typeof Admin>

  @hasMany(() => Room, {
    foreignKey: 'headquarter_id'
  })
  public room: HasMany<typeof Room>

  @belongsTo(() => City, {
    foreignKey: 'city_id'
  })
  public city: BelongsTo<typeof City>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
