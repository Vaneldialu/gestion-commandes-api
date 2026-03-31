import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AddUserReferenceToClientProduitsTable extends BaseSchema {
  protected tableName = 'client_produits'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign(['user_id'])
      table.dropColumn('user_id')
    })
  }
}
