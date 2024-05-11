import { DateTime } from 'luxon'
import { BaseModel, HasMany, HasOne, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import PlanXService from './PlanXService'
import Relocation from './Relocation'
import Executionservice from './Executionservice'

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public status: number

  @column()
  public price: number

  @column()
  public description: string

  @hasOne(() => Relocation,{
    foreignKey: 'service_id'
  })
  public relocation: HasOne<typeof Relocation>

  @hasMany(() => Executionservice,{
    foreignKey: 'service_id'
  })
  public executionservices: HasMany<typeof Executionservice>

  @hasMany(() => PlanXService,{
    foreignKey: 'service_id'
  })
  public planservices: HasMany<typeof PlanXService>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
