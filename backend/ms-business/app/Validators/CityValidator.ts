import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CityValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([rules.minLength(2), rules.maxLength(30)]),
    location: schema.string([rules.minLength(2), rules.maxLength(100)]),
    status: schema.string([rules.minLength(2), rules.maxLength(10), rules.regex(/^(ACTIVO|INACTIVO)$/)]),
    department: schema.object().members({
      id:schema.number([rules.exists({ table: 'departments', column: 'id' })])
    })
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {}
}
