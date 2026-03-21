import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class ClientProduit extends BaseModel {
  public static table = 'client_produits'

  @column({ isPrimary: true })
  public id!: number

  @column({ columnName: 'nom_client' })
  public nomClient!: string | null

  @column({ columnName: 'nom_produit' })
  public nomProduit!: string | null

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  public createdAt!: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at' })
  public updatedAt!: DateTime | null
}
