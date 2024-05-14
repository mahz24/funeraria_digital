import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SubscriptionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    client_id: schema.number(
      [rules.exists({ 
        table: 'clients', column: 'id' 
      })]),
    plan_id: schema.number(
      [rules.exists({ 
        table: 'plans', column: 'id' 
      })]),
      activation_date: schema.date()
      ,    status: schema.string([rules.regex(/^(ACTIVO|INACTIVO|CANCELADO)$/)]),

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
