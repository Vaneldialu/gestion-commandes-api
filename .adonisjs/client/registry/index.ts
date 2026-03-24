/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'commandes.show_invoice': {
    methods: ["GET","HEAD"],
    pattern: '/factures/:numero',
    tokens: [{"old":"/factures/:numero","type":0,"val":"factures","end":""},{"old":"/factures/:numero","type":1,"val":"numero","end":""}],
    types: placeholder as Registry['commandes.show_invoice']['types'],
  },
  'new_account.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/signup',
    tokens: [{"old":"/api/v1/auth/signup","type":0,"val":"api","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['new_account.store']['types'],
  },
  'access_token.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/login',
    tokens: [{"old":"/api/v1/auth/login","type":0,"val":"api","end":""},{"old":"/api/v1/auth/login","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/login","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['access_token.store']['types'],
  },
  'access_token.destroy': {
    methods: ["POST"],
    pattern: '/api/v1/auth/logout',
    tokens: [{"old":"/api/v1/auth/logout","type":0,"val":"api","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['access_token.destroy']['types'],
  },
  'profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/account/profile',
    tokens: [{"old":"/api/v1/account/profile","type":0,"val":"api","end":""},{"old":"/api/v1/account/profile","type":0,"val":"v1","end":""},{"old":"/api/v1/account/profile","type":0,"val":"account","end":""},{"old":"/api/v1/account/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.show']['types'],
  },
  'commandes.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/commandes',
    tokens: [{"old":"/api/v1/commandes","type":0,"val":"api","end":""},{"old":"/api/v1/commandes","type":0,"val":"v1","end":""},{"old":"/api/v1/commandes","type":0,"val":"commandes","end":""}],
    types: placeholder as Registry['commandes.index']['types'],
  },
  'commandes.store': {
    methods: ["POST"],
    pattern: '/api/v1/commandes',
    tokens: [{"old":"/api/v1/commandes","type":0,"val":"api","end":""},{"old":"/api/v1/commandes","type":0,"val":"v1","end":""},{"old":"/api/v1/commandes","type":0,"val":"commandes","end":""}],
    types: placeholder as Registry['commandes.store']['types'],
  },
  'commandes.update_status': {
    methods: ["PATCH"],
    pattern: '/api/v1/commandes/:id/statut',
    tokens: [{"old":"/api/v1/commandes/:id/statut","type":0,"val":"api","end":""},{"old":"/api/v1/commandes/:id/statut","type":0,"val":"v1","end":""},{"old":"/api/v1/commandes/:id/statut","type":0,"val":"commandes","end":""},{"old":"/api/v1/commandes/:id/statut","type":1,"val":"id","end":""},{"old":"/api/v1/commandes/:id/statut","type":0,"val":"statut","end":""}],
    types: placeholder as Registry['commandes.update_status']['types'],
  },
  'commandes.share_invoice': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/commandes/:id/partage',
    tokens: [{"old":"/api/v1/commandes/:id/partage","type":0,"val":"api","end":""},{"old":"/api/v1/commandes/:id/partage","type":0,"val":"v1","end":""},{"old":"/api/v1/commandes/:id/partage","type":0,"val":"commandes","end":""},{"old":"/api/v1/commandes/:id/partage","type":1,"val":"id","end":""},{"old":"/api/v1/commandes/:id/partage","type":0,"val":"partage","end":""}],
    types: placeholder as Registry['commandes.share_invoice']['types'],
  },
  'client_produits.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/client-produits',
    tokens: [{"old":"/api/v1/client-produits","type":0,"val":"api","end":""},{"old":"/api/v1/client-produits","type":0,"val":"v1","end":""},{"old":"/api/v1/client-produits","type":0,"val":"client-produits","end":""}],
    types: placeholder as Registry['client_produits.index']['types'],
  },
  'client_produits.store': {
    methods: ["POST"],
    pattern: '/api/v1/client-produits',
    tokens: [{"old":"/api/v1/client-produits","type":0,"val":"api","end":""},{"old":"/api/v1/client-produits","type":0,"val":"v1","end":""},{"old":"/api/v1/client-produits","type":0,"val":"client-produits","end":""}],
    types: placeholder as Registry['client_produits.store']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
