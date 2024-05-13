import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Department from './Department'
import Headquarter from './Headquarter'

export default class City extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public department_id:number

  @column()
  public name:string

  @column()
  public location: string

  @column()
  public status: string

  @belongsTo(() => Department,{
    foreignKey: 'department_id'
  })
  public department: BelongsTo<typeof Department>

  @hasMany(() => Headquarter,{
    foreignKey: "city_id"
  })
  public headquarter: HasMany<typeof Headquarter>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
