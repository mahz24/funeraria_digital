import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdminValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    user_id: schema.string([rules.minLength(2), rules.maxLength(100)]), 
    headquarter_id: schema.number(
      [rules.exists({ 
        table: 'headquarters', column: 'id' 
      })]),
    direction: schema.string([rules.minLength(2), rules.maxLength(100)])
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
