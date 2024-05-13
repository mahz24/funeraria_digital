import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CremationValidator {
  constructor(protected ctx: HttpContextContract) { }


  public schema = schema.create({
    cremation_date: schema.date(),
    status: schema.string([rules.minLength(2), rules.maxLength(30), rules.regex(/^(REALIZADO|CANCELADO|PENDIENTE)$/)
    ]),
    service_id: schema.number([rules.exists({ table: 'services', column: 'id' })]),
    room_id: schema.number([rules.exists({ table: 'rooms', column: 'id' })]),

  })
  public messages: CustomMessages = {}
}
