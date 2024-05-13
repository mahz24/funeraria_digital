import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ChatValidator {
  constructor(protected ctx: HttpContextContract) { }


  public schema = schema.create({
    chat_id: schema.number([rules.exists({ table: 'chats', column: 'id' })]),
    name: schema.string([rules.minLength(2), rules.maxLength(30)]),
    status: schema.string([rules.minLength(2), rules.maxLength(30), rules.regex(/^(ACTIVO|INACTIVO)$/)
    ]),
    executionservice_id: schema.number([rules.exists({ table: 'executionservices', column: 'id' })]),
    burial_date: schema.date()
  })

  public messages: CustomMessages = {}
}

