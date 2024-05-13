import { DateTime } from 'luxon'
import { BaseModel, HasMany, HasOne, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
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

  @hasMany(() => Executionservice, {
    foreignKey: 'room_id'
  })
  public executionservice: HasMany<typeof Executionservice>

  @hasOne(() => Cremation, {
    foreignKey: 'service_id'
  })
  public cremations: HasOne<typeof Cremation>

  @hasOne(() => Burial, {
    foreignKey: 'service_id'
  })
  public burials: HasOne<typeof Burial>

  @hasOne(() => Relocation, {
    foreignKey: 'service_id'
  })
  public relocations: HasOne<typeof Relocation>


  //  @belongsTo(() => PlanService, {
  //   foreignKey: 'room_id'
  // })
  // public planservice: BelongsTo<typeof PlanService>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
