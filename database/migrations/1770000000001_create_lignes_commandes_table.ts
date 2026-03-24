import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'lignes_commandes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table
        .integer('commande_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('commandes')
        .onDelete('CASCADE')
      table.string('nom_produit').notNullable()
      table.integer('quantite').unsigned().notNullable()
      table.decimal('prix_unitaire_vente', 14, 2).notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
