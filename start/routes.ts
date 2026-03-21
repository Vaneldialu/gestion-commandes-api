/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'

router.get('/', () => {
  return { hello: 'world' }
})

router.get('factures/:numero', [controllers.Commandes, 'showInvoice'])

router.group(() => {
  router.post('auth/signup', [controllers.NewAccount, 'store'])
  router.post('auth/login', [controllers.AccessToken, 'store'])
  router.post('auth/logout', [controllers.AccessToken, 'destroy']).use(middleware.auth())

  router.get('account/profile', [controllers.Profile, 'show']).use(middleware.auth())

  router.get('commandes', [controllers.Commandes, 'index'])
  router.post('commandes', [controllers.Commandes, 'store'])
  router.patch('commandes/:id/statut', [controllers.Commandes, 'updateStatus'])
  router.get('commandes/:id/partage', [controllers.Commandes, 'shareInvoice'])
  router.get('client-produits', [controllers.ClientProduits, 'index'])
  router.post('client-produits', [controllers.ClientProduits, 'store'])
}).prefix('/api/v1')
