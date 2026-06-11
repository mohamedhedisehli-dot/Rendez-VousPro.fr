# 🗂️ rendezvouPro — Phase 1 : Import des professionnels

## Ce que fait ce projet

Importe automatiquement les adresses et infos de professionnels depuis les **API publiques françaises gratuites** (INSEE / data.gouv.fr), les stocke dans une base SQLite locale, prête à être utilisée par le site rendezvouPro.

## Sources de données

| Source | Ce qu'elle contient | Gratuit ? |
|---|---|---|
| **API Annuaire Entreprises** (data.gouv.fr) | Nom, adresse, SIRET, code NAF | ✅ Oui, sans clé |
| **API Sirene INSEE** | Données officielles registre entreprises | ✅ Oui, sans clé |
| **Google Places** *(phase 2)* | Téléphone, horaires, avis, photos | ❌ Payant (~2€/1000) |

## Installation

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer l'import (tous secteurs)
npm run import

# 3. Voir les statistiques
npm run stats
```

## Structure des fichiers

```
rendezvoupro-phase1/
├── package.json
├── config/
│   └── secteurs-naf.js     ← 16 secteurs + 60 codes NAF
├── data/
│   └── rendezvoupro.db     ← Base SQLite (créée automatiquement)
└── src/
    ├── database.js          ← Schéma SQLite
    ├── import-sirene.js     ← Import via API Annuaire Entreprises
    ├── stats.js             ← Affichage des statistiques
    └── run-all.js           ← Lance tout d'un coup
```

## Base de données

La table `professionnels` contient :

| Colonne | Description |
|---|---|
| `siret` | Identifiant unique officiel |
| `nom` | Nom du professionnel / cabinet |
| `secteur_id` | sante, auto, beaute... |
| `code_naf` | Code activité INSEE |
| `adresse` | Adresse complète |
| `code_postal` / `ville` | Localisation |
| `latitude` / `longitude` | GPS (vide avant enrichissement) |
| `telephone` | Tel (vide avant enrichissement Google) |
| `inscrit` | 0 = annuaire public / 1 = inscrit rendezvouPro |

## Tester un seul secteur

Dans `src/import-sirene.js`, modifie la ligne :

```js
// Tous les secteurs :
const SECTEURS_ACTIFS = SECTEURS_NAF;

// Un seul secteur :
const SECTEURS_ACTIFS = SECTEURS_NAF.filter(s => s.id === 'sante');
```

## Phase 2 — Enrichissement Google Places

Une fois l'import Sirene fait, tu peux enrichir avec Google Places :

```bash
# Ajouter ta clé dans .env
GOOGLE_PLACES_KEY=ta_cle_ici

# Lancer l'enrichissement
node src/enrich-google.js
```

Cela ajoute pour chaque professionnel : téléphone, horaires, note Google, photos.

## Résultats attendus

| Secteur | Nb estimé |
|---|---|
| Santé | ~80 000 |
| Auto & Moto | ~60 000 |
| Habitat & Artisanat | ~150 000 |
| Beauté & Coiffure | ~70 000 |
| **Total** | **~600 000+** |
