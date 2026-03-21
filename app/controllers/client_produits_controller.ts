import type { HttpContext } from '@adonisjs/core/http'
import ClientProduit from '#models/client_produit'
import { clientProduitMessagesProvider, storeClientProduitValidator } from '#validators/client_produit'

export default class ClientProduitsController {
  public async index({ response }: HttpContext) {
    const enregistrements = await ClientProduit.query().orderBy('createdAt', 'desc')
    return response.ok(enregistrements)
  }

  public async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(storeClientProduitValidator, {
      messagesProvider: clientProduitMessagesProvider,
    })

    if (!payload.nom_client && !payload.nom_produit) {
      return response.unprocessableEntity({
        message: 'Vous devez indiquer un nom de client ou de produit.',
      })
    }

    const enregistrement = await ClientProduit.create({
      nomClient: payload.nom_client ?? null,
      nomProduit: payload.nom_produit ?? null,
    })

    return response.created(enregistrement)
  }
}
