# gestionCommande

## Pré-requis
- Installe les dépendances via `npm install`.
- Si tu comptes utiliser MySQL, ajoute `mysql2` (`npm install mysql2`) et configure les variables `DB_*` dans `.env`.
- Pour avoir des commandes `ace` compatibles Windows, installe `cross-env` (`npm install --save-dev cross-env`) dès que la connexion npm est stable.

## Commandes AdonisJS (doc officielle)
- Les commandes Ace s’exécutent maintenant via `npm run ace -- <commande>`. Par exemple :
  ```bash
  npm run ace -- migration:run
  npm run ace -- make:controller Commandes
  ```
- `npm run dev` lance le serveur HMR.
- `npm run build` compile TypeScript+assets à `build/`.
- `npm start` démarre le serveur en production (`node build/bin/server.js`).

## Base de données
- Par défaut on utilise SQLite (fichier `tmp/db.sqlite3`). Pour basculer sur un autre client (MySQL, Postgres, ...), décommente la connexion appropriée dans `config/database.ts` et installe le client correspondant (`mysql2`, `pg`, etc.).
- Une fois connecté, les migrations et seeders sont exécutés via :
  ```bash
  npm run ace -- migration:run
  npm run ace -- db:seed
  ```

## Autres commandes utiles
- `npm run ace -- list`: liste les commandes disponibles.
- `npm run ace -- test`: lance la batterie de tests.

> Remarque : certaines commandes nécessite `NODE_OPTIONS='--import tsx'` pour charger les sources TypeScript. C’est déjà intégré dans `npm run ace`.
