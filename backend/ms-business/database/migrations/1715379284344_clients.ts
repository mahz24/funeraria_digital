import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'clients'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('user_id')
      table.string('direction')
      table.boolean('is_alive')
<<<<<<< HEAD:backend/ms-business/database/migrations/1714597991277_clients.ts
=======

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
>>>>>>> 76da8987d95f807df22fb8095d6ac8f250d5b47a:backend/ms-business/database/migrations/1715379284344_clients.ts
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
