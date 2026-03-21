import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const STATUT_VALUES = ['en_attente', 'payee', 'non_payee', 'annulee'] as const
export type Statut = (typeof STATUT_VALUES)[number]

const frenchMessages = {
  required: 'Le champ {{ field }} est obligatoire.',
  'string.minLength': 'Le champ {{ field }} doit contenir au moins {{ options.min }} caractères.',
  'string.maxLength': 'Le champ {{ field }} ne peut dépasser {{ options.max }} caractères.',
  'number.positive': 'Le champ {{ field }} doit être strictement supérieur à zéro.',
  'number.min': 'Le champ {{ field }} doit être supérieur ou égal à {{ options.min }}.',
  'enum.enum': 'Le champ {{ field }} doit être l’un des suivants : {{ options.choices }}.',
  'array.minLength': 'Vous devez fournir au moins {{ options.minLength }} {{ field }}.',
}

const ligneSchema = vine.object({
  nom_produit: vine.string().trim().minLength(1).maxLength(255),
  quantite: vine.number().min(1),
  prix_unitaire_vente: vine.number().positive(),
})

export const storeCommandeValidator = vine.create({
  nom_client: vine.string().trim().minLength(2).maxLength(255),
  montant_total: vine.number().positive(),
  statut: vine.enum(STATUT_VALUES).optional(),
  lignes: vine.array(ligneSchema).minLength(1),
})

export const updateStatusValidator = vine.create({
  statut: vine.enum(STATUT_VALUES),
})

const frenchFieldNames = {
  nom_client: 'Nom du client',
  montant_total: 'Montant total',
  statut: 'Statut',
  lignes: 'Lignes de commande',
  nom_produit: 'Nom du produit',
  quantite: 'Quantité',
  prix_unitaire_vente: 'Prix unitaire de vente',
}

export const commandeMessagesProvider = new SimpleMessagesProvider(frenchMessages, frenchFieldNames)
export { STATUT_VALUES }
