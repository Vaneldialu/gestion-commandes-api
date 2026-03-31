import type { HttpContext } from '@adonisjs/core/http'
import ClientProduit from '#models/client_produit'
import { clientProduitMessagesProvider, storeClientProduitValidator } from '#validators/client_produit'

export default class ClientProduitsController {
  public async index({ response, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const enregistrements = await ClientProduit.query()
      .where('user_id', user.id)
      .orderBy('createdAt', 'desc')
    return response.ok(enregistrements)
  }

  public async store({ request, response, auth }: HttpContext) {
    const user = auth.getUserOrFail()
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
      userId: user.id,
    })

    return response.created(enregistrement)
  }
}
