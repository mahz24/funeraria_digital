import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TransmisionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    fecha_inicio: schema.date(), // se quitó el formato
    fecha_fin: schema.date(rules.after['fecha_inicio']), //se quitó el formato
    camara_id: schema.number([rules.exists({
      table: 'camaras', column: 'id'
    })]),
    executionservice_id: schema.number([rules.exists({
      table: 'executionservices', column: 'id'
    })])
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
