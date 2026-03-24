import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'client_produits'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('nom_client').nullable().alter()
      table.string('nom_produit').nullable().alter()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('nom_client').notNullable().alter()
      table.string('nom_produit').notNullable().alter()
    })
  }
}
