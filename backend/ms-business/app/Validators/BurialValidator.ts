import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BurialValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    burial_id:schema.number([rules.exists({ table: 'burials', column: 'id' })]),
    location:schema.string([rules.minLength(2), rules.maxLength(30)]),
    burial_type:schema.string([rules.minLength(2), rules.maxLength(15)]),
    burial_date:schema.date()
  })

  public messages: CustomMessages = {}
}
 

//   where: { theater_id: this.ctx.request.body()["theater_id"] }
// })]),