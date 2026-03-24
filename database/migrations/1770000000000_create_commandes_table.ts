import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'commandes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('nom_client').notNullable()
      table.decimal('montant_total', 14, 2).notNullable()
      table
        .enu('statut', ['en_attente', 'payee', 'annulee'])
        .notNullable()
        .defaultTo('en_attente')
      table.string('numero_facture').notNullable().unique()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
