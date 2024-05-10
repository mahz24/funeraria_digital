import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, HasOne, belongsTo, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Executionservice from './Executionservice'
import Cremation from './Cremation'
import Burial from './Burial'
import Relocation from './Relocation'

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public ubicacion_cuerpo:string

  @column()
  public recoger_cuerpo:boolean

  @column()
  public estado:string

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
