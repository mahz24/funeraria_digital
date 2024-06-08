import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PlanServiceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
   plan: schema.object().members({
    id:schema.number([rules.exists({ table: 'plans', column: 'id' })])
  }),
   service: schema.object().members({
    id:schema.number([rules.exists({ table: 'services', column: 'id' })])
  }),
  })
  
  public messages: CustomMessages = {}
}
