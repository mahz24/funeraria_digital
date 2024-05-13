import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MessageValidator {
  constructor(protected ctx: HttpContextContract) { }


  public schema = schema.create({
    content_message:schema.string(),
    chat_id: schema.number([rules.exists({ table: 'chats', column: 'id' })]),
    user_id: schema.number()
  })

  public messages: CustomMessages = {}
}
