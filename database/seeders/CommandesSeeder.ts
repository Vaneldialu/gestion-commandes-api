import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Commande from '#models/commande'
import LigneCommande from '#models/ligne_commande'

type SeedStatut = 'en_attente' | 'payee' | 'annulee'

type CommandeSeed = {
  commande: {
    nomClient: string
    montantTotal: number
    statut: SeedStatut
    numeroFacture: string
  }
  lignes: Array<{
    nom_produit: string
    quantite: number
    prix_unitaire_vente: number
  }>
}

const commandesFixtures: CommandeSeed[] = [
  {
    commande: {
      nomClient: 'Atelier Lumière',
      montantTotal: 840,
      statut: 'en_attente',
      numeroFacture: 'FAC-2026-001',
    },
    lignes: [
      { nom_produit: 'Kit lumière LED', quantite: 1, prix_unitaire_vente: 300 },
      { nom_produit: 'Diffuseur en verre', quantite: 1, prix_unitaire_vente: 540 },
    ],
  },
  {
    commande: {
      nomClient: 'Maison du Goût',
      montantTotal: 1420,
      statut: 'payee',
      numeroFacture: 'FAC-2026-002',
    },
    lignes: [
      { nom_produit: 'Palette de dégustation', quantite: 3, prix_unitaire_vente: 120 },
      { nom_produit: 'Armoire de service', quantite: 1, prix_unitaire_vente: 1060 },
    ],
  },
  {
    commande: {
      nomClient: 'Studio Céleste',
      montantTotal: 320,
      statut: 'annulee',
      numeroFacture: 'FAC-2026-003',
    },
    lignes: [
      { nom_produit: 'Maintenance décor', quantite: 1, prix_unitaire_vente: 320 },
    ],
  },
]

export default class CommandesSeeder extends BaseSeeder {
  public async run() {
    for (const fixture of commandesFixtures) {
      const commande = await Commande.create({
        ...fixture.commande,
      })

      const lignePayload = fixture.lignes.map((ligne) => ({
        commandeId: commande.id,
        nomProduit: ligne.nom_produit,
        quantite: ligne.quantite,
        prixUnitaireVente: ligne.prix_unitaire_vente,
      }))

      await LigneCommande.createMany(lignePayload)
    }
  }
}
