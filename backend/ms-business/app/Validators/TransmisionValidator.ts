import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TransmisionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    executionservice_id: schema.number(
      [rules.exists({ 
        table: 'executionservices', column: 'id' 
      })]),
    camara_id: schema.number(
      [rules.exists({ 
        table: 'camaras', column: 'id' 
      })]),
      fecha_inicio: schema.date(),
      fecha_fin: schema.date()

  })

  public messages: CustomMessages = {}
}
