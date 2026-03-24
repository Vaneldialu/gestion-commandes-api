/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'commandes.show_invoice': {
    methods: ["GET","HEAD"]
    pattern: '/factures/:numero'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { numero: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commandes_controller').default['showInvoice']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commandes_controller').default['showInvoice']>>>
    }
  }
  'new_account.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/signup'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').signupValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').signupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'access_token.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').loginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').loginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/access_token_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/access_token_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'access_token.destroy': {
    methods: ["POST"]
    pattern: '/api/v1/auth/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/access_token_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/access_token_controller').default['destroy']>>>
    }
  }
  'profile.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/account/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['show']>>>
    }
  }
  'commandes.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/commandes'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commandes_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commandes_controller').default['index']>>>
    }
  }
  'commandes.store': {
    methods: ["POST"]
    pattern: '/api/v1/commandes'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/commande').storeCommandeValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/commande').storeCommandeValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commandes_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commandes_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'commandes.update_status': {
    methods: ["PATCH"]
    pattern: '/api/v1/commandes/:id/statut'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/commande').updateStatusValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/commande').updateStatusValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commandes_controller').default['updateStatus']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commandes_controller').default['updateStatus']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'commandes.share_invoice': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/commandes/:id/partage'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commandes_controller').default['shareInvoice']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commandes_controller').default['shareInvoice']>>>
    }
  }
  'client_produits.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/client-produits'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/client_produits_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/client_produits_controller').default['index']>>>
    }
  }
  'client_produits.store': {
    methods: ["POST"]
    pattern: '/api/v1/client-produits'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/client_produit').storeClientProduitValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/client_produit').storeClientProduitValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/client_produits_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/client_produits_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
}
