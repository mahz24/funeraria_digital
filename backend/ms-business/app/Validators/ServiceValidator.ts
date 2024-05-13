import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ServiceValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    description: schema.string([rules.minLength(2), rules.maxLength(30)]),
    price: schema.number([rules.range(0,999999999)]),
    status: schema.string([rules.minLength(2),rules.maxLength(30), rules.regex(/^(ACTIVO|INACTIVO)$/)
     ]),
  })

  public messages: CustomMessages = {}
}
