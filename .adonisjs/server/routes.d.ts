import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'commandes.show_invoice': { paramsTuple: [ParamValue]; params: {'numero': ParamValue} }
    'new_account.store': { paramsTuple?: []; params?: {} }
    'access_token.store': { paramsTuple?: []; params?: {} }
    'access_token.destroy': { paramsTuple?: []; params?: {} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'commandes.index': { paramsTuple?: []; params?: {} }
    'commandes.store': { paramsTuple?: []; params?: {} }
    'commandes.update_status': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'commandes.share_invoice': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'client_produits.index': { paramsTuple?: []; params?: {} }
    'client_produits.store': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'commandes.show_invoice': { paramsTuple: [ParamValue]; params: {'numero': ParamValue} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'commandes.index': { paramsTuple?: []; params?: {} }
    'commandes.share_invoice': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'client_produits.index': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'commandes.show_invoice': { paramsTuple: [ParamValue]; params: {'numero': ParamValue} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'commandes.index': { paramsTuple?: []; params?: {} }
    'commandes.share_invoice': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'client_produits.index': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'new_account.store': { paramsTuple?: []; params?: {} }
    'access_token.store': { paramsTuple?: []; params?: {} }
    'access_token.destroy': { paramsTuple?: []; params?: {} }
    'commandes.store': { paramsTuple?: []; params?: {} }
    'client_produits.store': { paramsTuple?: []; params?: {} }
  }
  PATCH: {
    'commandes.update_status': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}