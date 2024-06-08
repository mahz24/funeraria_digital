import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RelocationValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    location: schema.string([rules.minLength(2), rules.maxLength(50)]),
    status: schema.string([rules.minLength(2), rules.maxLength(30), rules.regex(/^(REALIZADO|CANCELADO|PENDIENTE)$/)
    ]),
    service: schema.object().members({
      id:schema.number([rules.exists({ table: 'services', column: 'id' })])
    }),
    departure_time: schema.date(),
    arrival_time: schema.date(rules.after['departure_time'])

  })

  public messages: CustomMessages = {}
}
