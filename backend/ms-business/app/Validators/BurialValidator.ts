import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BurialValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    burial_id:schema.number([rules.exists({ table: 'burials', column: 'id' })]),
    location:schema.string([rules.minLength(2),rules.unique({
      table:'theaters',
      column: 'location',
      caseInsensitive: true,
    })]),
    capacity:schema.number([rules.range(1,100)])
  })

  public messages: CustomMessages = {}
}
