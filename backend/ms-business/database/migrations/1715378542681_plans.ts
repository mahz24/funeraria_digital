import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'plans'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.string('description')
<<<<<<< HEAD:backend/ms-business/database/migrations/1712810108570_rooms.ts
      table.integer('capacity')
      table.string('status')
      table.integer('heaquarter_id')
        .unsigned()
        .references('headquarter.id')
        .onDelete('CASCADE')
=======
      table.float('price')
      

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
>>>>>>> 76da8987d95f807df22fb8095d6ac8f250d5b47a:backend/ms-business/database/migrations/1715378542681_plans.ts
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
