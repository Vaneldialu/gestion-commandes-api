import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Commande from '#models/commande'

export default class LigneCommande extends BaseModel {
  public static table = 'lignes_commandes'

  @column({ isPrimary: true })
  public id!: number

  @column({ columnName: 'commande_id' })
  public commandeId!: number

  @column({ columnName: 'nom_produit' })
  public nomProduit!: string

  @column()
  public quantite!: number

  @column({ columnName: 'prix_unitaire_vente' })
  public prixUnitaireVente!: number

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  public createdAt!: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at' })
  public updatedAt!: DateTime | null

  @belongsTo(() => Commande)
  public commande!: BelongsTo<typeof Commande>
}
