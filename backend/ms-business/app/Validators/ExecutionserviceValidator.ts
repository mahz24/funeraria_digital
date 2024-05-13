import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ExecutionserviceValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    client_id: schema.number([rules.exists({ table: 'clients', column: 'id' })]),
    service_id: schema.number([rules.exists({ table: 'services', column: 'id' })]),
    end_date: schema.date()
  })

  public messages: CustomMessages = {}
}
