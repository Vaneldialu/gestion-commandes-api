import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const frenchMessages = {
  required: 'Le champ {{ field }} est obligatoire.',
  'string.minLength': 'Le champ {{ field }} doit contenir au moins {{ options.min }} caractères.',
  'string.maxLength': 'Le champ {{ field }} ne peut dépasser {{ options.max }} caractères.',
  'enum.enum': 'Le champ {{ field }} doit être l’un des suivants : {{ options.choices }}.',
}

const validateName = () =>
  vine
    .string()
    .trim()
    .minLength(2)
    .maxLength(255)
    .nullable()
    .optional()

export const storeClientProduitValidator = vine.create({
  type: vine.enum(['client', 'produit']).optional(),
  nom_client: validateName(),
  nom_produit: validateName(),
})

const frenchFieldNames = {
  type: 'Type',
  nom_client: 'Nom du client',
  nom_produit: 'Nom du produit',
}

export const clientProduitMessagesProvider = new SimpleMessagesProvider(frenchMessages, frenchFieldNames)
