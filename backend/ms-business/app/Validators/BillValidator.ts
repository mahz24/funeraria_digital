import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BillValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    subscription_id: schema.number(
      [rules.exists({ 
        table: 'subscriptions', column: 'id' 
      })]),
    amount: schema.number([rules.range(1,1000000)]),
    date: schema.date()
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
