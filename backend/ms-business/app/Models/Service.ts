import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import PlanXService from './PlanXService'

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public ubicacion_cuerpo:string

  @column()
  public recoger_cuerpo:boolean

  @column()
  public estado:string

  @hasMany(() => PlanXService,{
    foreignKey: 'service_id'
  })
  public planservices: HasMany<typeof PlanXService>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
