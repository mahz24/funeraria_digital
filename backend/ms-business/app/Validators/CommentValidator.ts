import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CommentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    description: schema.string([rules.minLength(2), rules.maxLength(100)]),
    rating: schema.number([rules.range(0,5)]),
    executionservice_id: schema.number([rules.exists({ table: 'executionservices', column: 'id' })]),
  })
  public messages: CustomMessages = {}
}
