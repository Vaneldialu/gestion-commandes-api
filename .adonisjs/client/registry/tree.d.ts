/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  commandes: {
    showInvoice: typeof routes['commandes.show_invoice']
    index: typeof routes['commandes.index']
    store: typeof routes['commandes.store']
    updateStatus: typeof routes['commandes.update_status']
    shareInvoice: typeof routes['commandes.share_invoice']
  }
  newAccount: {
    store: typeof routes['new_account.store']
  }
  accessToken: {
    store: typeof routes['access_token.store']
    destroy: typeof routes['access_token.destroy']
  }
  profile: {
    show: typeof routes['profile.show']
  }
  clientProduits: {
    index: typeof routes['client_produits.index']
    store: typeof routes['client_produits.store']
  }
}
