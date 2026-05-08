import { existsSync } from 'fs'
import { randomUUID } from 'crypto'
import { DateTime } from 'luxon'
import app from '@adonisjs/core/services/app'
import db from '@adonisjs/lucid/services/db'
import type { HttpContext } from '@adonisjs/core/http'
import PDFDocument from 'pdfkit'
import Commande from '#models/commande'
import LigneCommande from '#models/ligne_commande'
import {
  commandeMessagesProvider,
  storeCommandeValidator,
  updateStatusValidator,
} from '#validators/commande'

export default class CommandesController {
  public async index({ response, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const commandes = await Commande.query()
      .where('user_id', user.id)
      .preload('lignes')
      .orderBy('createdAt', 'desc')
    return response.ok(commandes)
  }

  public async store({ request, response, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const payload = await request.validateUsing(storeCommandeValidator, {
      messagesProvider: commandeMessagesProvider,
    })

    
    const trx = await db.transaction()

    try {
      const numeroFacture = await this.generateInvoiceNumber(trx)
      
      const commande = new Commande()
      commande.nomClient = payload.nom_client
      commande.montantTotal = payload.montant_total
      commande.statut = payload.statut ?? 'en_attente'
      commande.numeroFacture = numeroFacture
      commande.userId = user.id
      
      // On attache la transaction
      commande.useTransaction(trx)
      await commande.save()

      const lignes = payload.lignes.map((ligne: any) => ({
        commandeId: commande.id,
        nomProduit: ligne.nom_produit,
        quantite: ligne.quantite,
        prixUnitaireVente: ligne.prix_unitaire_vente,
      }))

      // On crée les lignes en utilisant la transaction
      await LigneCommande.createMany(lignes, { client: trx })
      
      await trx.commit()
      await commande.load('lignes')

      return response.created(commande)
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }

  public async updateStatus({ params, request, response, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const { statut } = await request.validateUsing(updateStatusValidator, {
      messagesProvider: commandeMessagesProvider,
    })
    const commande = await Commande.query()
      .where('id', params.id)
      .where('user_id', user.id)
      .firstOrFail()

    commande.statut = statut
    await commande.save()
    await commande.load('lignes')

    return response.ok(commande)
  }

  public async shareInvoice({ params, response, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const commande = await Commande.query()
      .preload('lignes')
      .where('id', params.id)
      .where('user_id', user.id)
      .firstOrFail()

    const baseUrl = process.env.APP_URL ?? 'http://localhost:3333'
    const invoiceUrl = new URL(`/factures/${commande.numeroFacture}`, baseUrl).toString()
    
    
    const montant = typeof commande.montantTotal === 'number' 
      ? commande.montantTotal.toFixed(2) 
      : commande.montantTotal

    const message = `Facture ${commande.numeroFacture} (${commande.nomClient} - ${montant} €)\n${invoiceUrl}`

    return response.ok({
      invoiceUrl,
      whatsappShareUrl: `https://wa.me/?text=${encodeURIComponent(message)}`,
      emailShareUrl: `mailto:?subject=${encodeURIComponent(
        `Facture ${commande.numeroFacture}`
      )}&body=${encodeURIComponent(message)}`,
      commande,
    })
  }

  public async showInvoice({ params, response }: HttpContext) {
    const commande = await Commande.query()
      .preload('lignes')
      .where('numero_facture', params.numero)
      .firstOrFail()

    const pdfBuffer = await this.buildInvoicePdf(commande)

    response
      .header('Content-Type', 'application/pdf')
      .header('Content-Disposition', `inline; filename="${commande.numeroFacture}.pdf"`)
      .header('Content-Length', String(pdfBuffer.length))

    return response.send(pdfBuffer)
  }

  private async buildInvoicePdf(commande: Commande) {
    const pdf = new PDFDocument({ size: 'A4', margin: 48 })
    const logoPath = app.publicPath('images/active-travel-logo.png')

    if (existsSync(logoPath)) {
      pdf.image(logoPath, pdf.page.margins.left, pdf.y, { width: 150 })
      pdf.moveDown(1.2)
    } else {
      pdf.moveDown(0.5)
    }
    const chunks: Buffer[] = []
    const completion = new Promise<void>((resolve, reject) => {
      pdf.on('data', (chunk: Buffer) => chunks.push(chunk))
      pdf.on('end', () => resolve())
      pdf.on('error', (error) => reject(error))
    })

    pdf.fontSize(20).text('Facture', { align: 'right' })
    pdf.fontSize(14).text('Active travel', { align: 'right',  })
    pdf.fontSize(14).text('N°RCCM : CD/KNM/RCCM/26-A-00771', { align: 'right' })
    pdf.fontSize(14).text('ID Nationale : 01-G4701-N94220E', { align: 'right' })
    pdf.moveDown(0.2)

    pdf.fontSize(14).text(commande.numeroFacture, { align: 'right' })
    pdf.moveDown(1)

    const emissionDate =
      commande.createdAt?.toFormat('dd/MM/yyyy') ?? DateTime.local().toFormat('dd/MM/yyyy')

    pdf.fontSize(12).text(`Client : ${commande.nomClient}`)
    pdf.text(`Statut : ${this.getStatutLabel(commande.statut)}`)
    pdf.text(`Date d'émission : ${emissionDate}`)
    pdf.moveDown(0.5)

    pdf.fontSize(14).text('Détails', { underline: true })
    pdf.moveDown(0.5)

    const tableTop = pdf.y
    const columnWidths = { product: 190, qty: 70, unit: 110, total: 130 }
    pdf.fontSize(11).font('Helvetica-Bold')
    const productX = 48
    const qtyX = productX + columnWidths.product - 10
    const unitX = qtyX + columnWidths.qty
    const totalX = unitX + columnWidths.unit
    pdf.text('Produit', productX, tableTop)
    pdf.text('Qté', qtyX, tableTop, { width: columnWidths.qty, align: 'right' })
    pdf.text('Prix unitaire', unitX, tableTop, {
      width: columnWidths.unit,
      align: 'right',
    })
    pdf.text('Total ligne', totalX, tableTop, {
      width: columnWidths.total,
      align: 'right',
    })
    pdf.moveDown(0.5)
    pdf.font('Helvetica').fontSize(11)

    const relationLignes = commande.lignes ?? []
    const lignes = Array.isArray(relationLignes)
      ? relationLignes
      : (relationLignes as any)?.toJSON?.() ?? []

    if (lignes.length === 0) {
      pdf.font('Times-Italic').text('Aucun article enregistré')
      pdf.font('Times-Roman')
    } else {
      const lineHeight = 20
      let cursorY = pdf.y

      const drawRow = (y: number, product: string, qty: number, unit: number, total: number) => {
        pdf.text(product, 48, y, { width: columnWidths.product, lineBreak: false })
        pdf.text(String(qty), qtyX, y, {
          width: columnWidths.qty,
          align: 'right',
        })
        pdf.text(this.formatCurrency(unit), unitX, y, {
          width: columnWidths.unit,
          align: 'right',
        })
        pdf.text(this.formatCurrency(total), totalX, y, {
          width: columnWidths.total,
          align: 'right',
        })
      }

      lignes.forEach((ligne: any) => {
        const quantite = Number(ligne.quantite ?? 0)
        const prixUnitaire = Number(ligne.prixUnitaireVente ?? 0)
        const totalLigne = quantite * prixUnitaire
        drawRow(cursorY, ligne.nomProduit, quantite, prixUnitaire, totalLigne)
        cursorY += lineHeight
      })

      pdf.y = cursorY
    }

    pdf.moveDown()
    const montantTotal = Number(commande.montantTotal ?? 0)
    pdf.lineWidth(0.5)
    pdf.moveTo(48, pdf.y).lineTo(550, pdf.y).stroke()
    pdf.moveDown(0.5)
    pdf.font('Helvetica-Bold').fontSize(12).text('Montant total', { align: 'right' })
    pdf.font('Helvetica').text(this.formatCurrency(montantTotal), { align: 'right' })

    pdf.end()

    await completion
    return Buffer.concat(chunks)
  }

  private getStatutLabel(statut: Commande['statut']) {
    const labels: Record<Commande['statut'], string> = {
      en_attente: 'En attente',
      payee: 'Payée',
      non_payee: 'Non payée',
      annulee: 'Annulée',
    }

    return labels[statut] ?? statut
  }

  private formatCurrency(value: number) {
    return `${value.toFixed(2)} $`
  }

  private async generateInvoiceNumber(_: any) {
    return randomUUID()
  }
}
