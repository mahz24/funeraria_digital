import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RoomValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    name: schema.string([rules.minLength(2), rules.maxLength(30)]),
    description: schema.string([rules.minLength(2), rules.maxLength(30)]),
    capacity:schema.number([rules.range(1,100)]),
    status: schema.string([rules.minLength(2), rules.maxLength(30), rules.regex(/^(ACTIVO|INACTIVO)$/)
    ]),
    headquarter_id: schema.number([rules.exists({ table: 'headquarters', column: 'id' })])
  })


  public messages: CustomMessages = {}
}
