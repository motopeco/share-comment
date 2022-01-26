import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Comments extends BaseSchema {
  protected tableName = 'comments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')

      // 秒数
      table.bigInteger('time').notNullable().defaultTo(0)
      table.bigInteger('user_id').notNullable()
      table.text('content').notNullable()
      table.boolean('is_ban').notNullable().defaultTo(false)
      // NGレベル
      table.integer('ng_level').notNullable().defaultTo(0)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
