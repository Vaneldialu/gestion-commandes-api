import type { Database as LucidDatabase } from '@adonisjs/lucid/database'
import type { TransactionClientContract } from '@adonisjs/lucid/types/database'

declare module '@ioc:Adonis/Lucid/Database' {
  const Database: LucidDatabase
  export { TransactionClientContract }
  export default Database
}
