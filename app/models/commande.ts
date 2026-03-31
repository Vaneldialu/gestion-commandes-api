import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, belongsTo } from '@adonisjs/lucid/orm'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import LigneCommande from '#models/ligne_commande'
import User from '#models/user'

export default class Commande extends BaseModel {
  public static table = 'commandes'

  @column({ isPrimary: true })
  public id!: number

  @column({ columnName: 'nom_client' })
  public nomClient!: string

  @column({ columnName: 'montant_total' })
  public montantTotal!: number

  @column()
  public statut!: 'en_attente' | 'payee' | 'non_payee' | 'annulee'

  @column({ columnName: 'numero_facture' })
  public numeroFacture!: string

  @column({ columnName: 'user_id' })
  public userId!: number

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  public createdAt!: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at' })
  public updatedAt!: DateTime | null

  @hasMany(() => LigneCommande)
  public lignes!: HasMany<typeof LigneCommande>

  @belongsTo(() => User)
  public user!: BelongsTo<typeof User>
}
