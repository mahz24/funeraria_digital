import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'burials'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('service_id')
        .unsigned()
        .references('services.id')
        .onDelete('CASCADE')
      table.integer('room_id')
        .unsigned()
        .references('rooms.num')
        .onDelete('CASCADE')
      table.string('location')
      table.string('burial_type')
      table.timestamp('burial_date')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
