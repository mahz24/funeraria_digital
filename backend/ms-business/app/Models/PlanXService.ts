import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Service from './Service'
import Plan from './Plan'

export default class PlanXService extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public started_at: Date

  @belongsTo(() => Service,{
    foreignKey: 'service_id'
  })
  public service_id: BelongsTo<typeof Service>  

  @belongsTo(() => Plan,{
    foreignKey: 'plan_id'
  })
  public plan_id: BelongsTo<typeof Plan>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
