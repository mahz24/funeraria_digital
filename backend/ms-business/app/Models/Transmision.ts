import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Camara from './Camara'
import Executionservice from './Executionservice'

export default class Transmision extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime()
  public fecha_inicio: DateTime

  @column.dateTime()
  public fecha_fin: DateTime

  @column()
  public camara_id: number

  @column()
  public executionservice_id: number

  @belongsTo(() => Camara,{
    foreignKey: 'camara_id'
  })
  public camara: BelongsTo<typeof Camara>

  @belongsTo(() => Executionservice,{
    foreignKey: 'executionservice_id'
  })
  public executionservice: BelongsTo<typeof Executionservice>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
