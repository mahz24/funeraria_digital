import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CamaraValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    alto: schema.number([rules.range(0,100)]),
    ancho: schema.number([rules.range(0,100)])
  })

  public messages: CustomMessages = {}
}
