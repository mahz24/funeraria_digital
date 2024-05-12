import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'relocations'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('service_id')
            .unsigned()
            .references('services.id')
            .onDelete('CASCADE') 
      table.string('location')
      table.string('status')
      table.timestamp('departure_time')
      table.timestamp('arrival_time')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
