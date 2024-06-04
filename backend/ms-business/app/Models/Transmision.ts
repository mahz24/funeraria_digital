import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Executionservice from './Executionservice'
import Camara from './Camara'

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

  @belongsTo(() => Executionservice, {
    foreignKey: 'executionservice_id'
  })
  public executionservice: BelongsTo<typeof Executionservice>

  @belongsTo(() => Camara, {
    foreignKey: 'camara_id'
  })
  public camara: BelongsTo<typeof Camara>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
