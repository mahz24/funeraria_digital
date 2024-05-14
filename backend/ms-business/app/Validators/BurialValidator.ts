import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BurialValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    service_id: schema.number([rules.exists({ table: 'services', column: 'id' })]),
    location:schema.string([rules.minLength(2), rules.maxLength(30)]),
    burial_type: schema.string([rules.regex(/^(ENTIERRO|OSARIO|CAMPO)$/)]),
    burial_date:schema.date(),
    room_id: schema.number([rules.exists({ table: 'rooms', column: 'num' })]),
  })

  public messages: CustomMessages = {}
}
 