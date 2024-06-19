import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BenefactorValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    client: schema.object().members({
      id:schema.number([rules.exists({ table: 'clients', column: 'id' })])
    }),
    holder: schema.object().members({
      id:schema.number([rules.exists({ table: 'holders', column: 'id' })])
    }),
      isprincipal_benefactor: schema.boolean(),
      isemergency_contact: schema.boolean()
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
