import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Burial from './Burial'
import Cremation from './Cremation'
import Headquarter from './Headquarter'

export default class Room extends BaseModel {
  @column({ isPrimary: true })
  public num: number

  @column()
  public name:string

  @column()
  public description:string

  @column()
  public capacity:number

  @column()
  public headquarter_id:number

  @column()
  public status:string

  @hasMany(() => Burial, {
    foreignKey: 'room_id'
  })
  public burials: HasMany<typeof Burial>

  @hasMany(() => Cremation, {
    foreignKey: 'room_id'
  })
  public cremations: HasMany<typeof Cremation>

  @belongsTo(() => Headquarter, {
    foreignKey: 'headquarter_id'
  })
  public headquarter: BelongsTo<typeof Headquarter>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
