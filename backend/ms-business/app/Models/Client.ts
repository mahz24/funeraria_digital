import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Holder from './Holder'
import Benefactor from './Benefactor'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: string

  @column()
  public direction:string

  @column()
  public gender:string

  @column()
  public is_alive: boolean

  @hasMany(() => Holder,{
    foreignKey: 'client_id'
  })
  public holder: HasMany<typeof Holder>

  @hasMany(() => Benefactor,{
    foreignKey: 'client_id'
  })
  public benefactor: HasMany<typeof Benefactor>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
