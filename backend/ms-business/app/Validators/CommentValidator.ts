import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CommentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    description: schema.string([rules.minLength(2), rules.maxLength(30)]),
    rating: schema.number([rules.minLength(1), rules.range(0,5)]),
    executionservice_id: schema.number([rules.exists({ table: 'executionservices', column: 'id' })]),
  })
  public messages: CustomMessages = {}
}
