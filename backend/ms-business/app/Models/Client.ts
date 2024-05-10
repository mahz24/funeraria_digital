import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
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

  @hasOne(() => Holder,{
    foreignKey: 'client_id'
  })
  public holder: HasOne<typeof Holder>

  @hasOne(() => Benefactor,{
    foreignKey: 'client_id'
  })
  public benefactor: HasOne<typeof Benefactor>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
