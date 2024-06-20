import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import PlanXService from './PlanXService'
import Executionservice from './Executionservice'
import Cremation from './Cremation'
import Burial from './Burial'
import Relocation from './Relocation'

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public status: string

  @column()
  public price: number

  @column()
  public description: string

  @hasMany(() => Executionservice,{
    foreignKey: 'service_id'
  })
  public executionservices: HasMany<typeof Executionservice>

  @hasMany(() => PlanXService,{
    foreignKey: 'service_id'
  })
  public planservices: HasMany<typeof PlanXService>

  @hasMany(() => Cremation, {
    foreignKey: 'service_id'
  })
  public cremations: HasMany<typeof Cremation>

  @hasMany(() => Burial, {
    foreignKey: 'service_id'
  })
  public burials: HasMany<typeof Burial>

  @hasMany(() => Relocation, {
    foreignKey: 'service_id'
  })
  public relocations: HasMany<typeof Relocation>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
