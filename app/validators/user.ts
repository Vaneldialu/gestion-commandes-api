import vine, { SimpleMessagesProvider } from '@vinejs/vine'

/**
 * Shared rules for email and password.
 */
const email = () => vine.string().email().maxLength(254)
const password = () => vine.string().minLength(8).maxLength(32)

/**
 * Validator to use when performing self-signup
 */
export const signupValidator = vine.create({
  fullName: vine.string().nullable(),
  email: email().unique({ table: 'users', column: 'email' }),
  password: password(),
  passwordConfirmation: password().sameAs('password'),
})

/**
 * Validator to use before validating user credentials
 * during login
 */
export const loginValidator = vine.create({
  email: email(),
  password: vine.string(),
})

const frenchUserMessages = {
  required: 'Le champ {{ field }} est obligatoire.',
  'string': 'Le champ {{ field }} doit être une chaîne de caractères.',
  'string.email': 'Le champ {{ field }} doit être une adresse e-mail valide.',
  'string.minLength': 'Le champ {{ field }} doit contenir au moins {{ options.min }} caractères.',
  'string.maxLength': 'Le champ {{ field }} ne peut dépasser {{ options.max }} caractères.',
  'string.sameAs': 'Le champ {{ field }} doit être identique au mot de passe.',
  'database.unique': 'Ce {{ field }} est déjà utilisé par un autre compte.',
}

const frenchUserFields = {
  fullName: 'Nom complet',
  email: 'Adresse e-mail',
  password: 'Mot de passe',
  passwordConfirmation: 'Confirmation du mot de passe',
}

export const userMessagesProvider = new SimpleMessagesProvider(frenchUserMessages, frenchUserFields)
