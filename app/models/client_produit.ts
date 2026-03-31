import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'

export default class ClientProduit extends BaseModel {
  public static table = 'client_produits'

  @column({ isPrimary: true })
  public id!: number

  @column({ columnName: 'nom_client' })
  public nomClient!: string | null

  @column({ columnName: 'nom_produit' })
  public nomProduit!: string | null

  @column({ columnName: 'user_id' })
  public userId!: number

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  public createdAt!: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at' })
  public updatedAt!: DateTime | null

  @belongsTo(() => User)
  public user!: BelongsTo<typeof User>
}
