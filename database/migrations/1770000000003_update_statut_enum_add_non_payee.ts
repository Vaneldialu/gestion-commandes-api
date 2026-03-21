import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'commandes'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .enu('statut', ['en_attente', 'payee', 'non_payee', 'annulee'])
        .notNullable()
        .defaultTo('en_attente')
        .alter()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .enu('statut', ['en_attente', 'payee', 'annulee'])
        .notNullable()
        .defaultTo('en_attente')
        .alter()
    })
  }
}
