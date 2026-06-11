// ============================================================
// import-sirene.js — Import des professionnels via API Sirene INSEE
// ============================================================
// API gratuite, sans clé, sans inscription
// Doc : https://api.insee.fr/catalogue/site/themes/wso2/subthemes/insee/pages/item-info.jag?name=Sirene&version=V3&provider=insee
// ============================================================

import fetch from 'node-fetch';
import { openDB, initDB } from './database.js';
import SECTEURS_NAF from '../config/secteurs-naf.js';

// ── CONFIG ──────────────────────────────────────────────────
const API_BASE = 'https://api.annuaire-entreprises.data.gouv.fr';
const DELAY_MS = 300;        // délai entre requêtes (respect rate limit)
const MAX_PAR_SECTEUR = 200; // max établissements par secteur (augmenter en prod)

// ── UTILITAIRES ─────────────────────────────────────────────
const sleep = ms => new Promise(r => setTimeout(r, ms));

function cleanText(str) {
  if (!str) return null;
  return str.trim().replace(/\s+/g, ' ') || null;
}

function extractDepartement(cp) {
  if (!cp) return null;
  const s = String(cp);
  if (s.startsWith('97') || s.startsWith('98')) return s.slice(0, 3);
  return s.slice(0, 2);
}

// ── RECHERCHE VIA API ANNUAIRE ENTREPRISES ─────────────────
// API publique data.gouv.fr — pas de clé requise
async function rechercherParNAF(codeNAF, page = 1) {
  const url = `${API_BASE}/search?activite_principale=${codeNAF}&page=${page}&per_page=25&type=EI,SARL,SAS,SA,SNC,EURL,SELARL,SCM,association`;

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'rendezvouPro/1.0 (contact@rendezvoupro.fr)' }
    });

    if (!res.ok) {
      console.warn(`  ⚠️  NAF ${codeNAF} page ${page}: HTTP ${res.status}`);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.warn(`  ⚠️  Erreur réseau NAF ${codeNAF}:`, err.message);
    return null;
  }
}

// ── RÉCUPÉRER DÉTAILS D'UN ÉTABLISSEMENT ───────────────────
async function getEtablissement(siret) {
  const url = `${API_BASE}/etablissement/${siret}`;
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'rendezvouPro/1.0' }
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// ── TRANSFORMER UN RÉSULTAT API EN LIGNE DB ─────────────────
function transformerResultat(item, secteurId) {
  // Adresse
  const adresse = [
    item.siege?.numero_voie,
    item.siege?.type_voie,
    item.siege?.libelle_voie
  ].filter(Boolean).join(' ');

  return {
    siret:        cleanText(item.siege?.siret),
    siren:        cleanText(item.siren),
    nom:          cleanText(item.nom_complet || item.nom_raison_sociale || item.prenom_nom),
    enseigne:     cleanText(item.siege?.enseigne_1 || item.nom_commercial),
    secteur_id:   secteurId,
    code_naf:     cleanText(item.siege?.activite_principale || item.activite_principale),
    adresse:      cleanText(adresse) || null,
    code_postal:  cleanText(item.siege?.code_postal),
    ville:        cleanText(item.siege?.libelle_commune),
    departement:  extractDepartement(item.siege?.code_postal),
    actif:        item.etat_administratif === 'A' ? 1 : 0,
    source:       'sirene',
  };
}

// ── INSÉRER DANS LA DB ──────────────────────────────────────
function insererProfessionnel(db, pro) {
  const stmt = db.prepare(`
    INSERT OR IGNORE INTO professionnels
      (siret, siren, nom, enseigne, secteur_id, code_naf,
       adresse, code_postal, ville, departement, actif, source)
    VALUES
      (@siret, @siren, @nom, @enseigne, @secteur_id, @code_naf,
       @adresse, @code_postal, @ville, @departement, @actif, @source)
  `);

  const result = stmt.run(pro);
  return result.changes > 0;
}

// ── IMPORT D'UN SECTEUR ─────────────────────────────────────
async function importerSecteur(db, secteur) {
  console.log(`\n📂 Secteur : ${secteur.icon} ${secteur.nom}`);
  console.log(`   Codes NAF : ${secteur.codes_naf.join(', ')}`);

  let totalInseres = 0;
  let totalTraites = 0;

  // Log import
  const log = db.prepare(`
    INSERT INTO import_logs (source, secteur_id, statut)
    VALUES ('sirene', ?, 'en_cours')
  `).run(secteur.id);
  const logId = log.lastInsertRowid;

  for (const codeNAF of secteur.codes_naf) {
    let page = 1;
    let continuer = true;

    while (continuer && totalInseres < MAX_PAR_SECTEUR) {
      await sleep(DELAY_MS);

      const data = await rechercherParNAF(codeNAF, page);
      if (!data || !data.results || data.results.length === 0) {
        continuer = false;
        break;
      }

      for (const item of data.results) {
        totalTraites++;
        const pro = transformerResultat(item, secteur.id);

        if (!pro.siret || !pro.nom) continue;

        const insere = insererProfessionnel(db, pro);
        if (insere) totalInseres++;
      }

      // Pagination
      const total = data.total_results || 0;
      const parPage = data.per_page || 25;
      const dernierePageDispo = Math.ceil(total / parPage);

      process.stdout.write(`   NAF ${codeNAF} | page ${page}/${Math.min(dernierePageDispo, 4)} | +${totalInseres} insérés\r`);

      if (page >= Math.min(dernierePageDispo, 4)) { // max 4 pages par code NAF
        continuer = false;
      } else {
        page++;
      }
    }
  }

  // Mettre à jour le log
  db.prepare(`
    UPDATE import_logs
    SET nb_traites = ?, nb_inseres = ?, statut = 'terminé', date_fin = datetime('now')
    WHERE id = ?
  `).run(totalTraites, totalInseres, logId);

  console.log(`   ✅ ${secteur.nom} : ${totalInseres} professionnels insérés (${totalTraites} traités)`);
  return totalInseres;
}

// ── MAIN ────────────────────────────────────────────────────
async function main() {
  console.log('🚀 rendezvouPro — Import Sirene INSEE');
  console.log('=====================================\n');

  // Init DB
  initDB();
  const db = openDB();

  // Secteurs à importer (tous par défaut, ou filtrer par id)
  const SECTEURS_ACTIFS = SECTEURS_NAF;
  // Pour tester un seul secteur :
  // const SECTEURS_ACTIFS = SECTEURS_NAF.filter(s => s.id === 'sante');

  let totalGlobal = 0;
  const debut = Date.now();

  for (const secteur of SECTEURS_ACTIFS) {
    const n = await importerSecteur(db, secteur);
    totalGlobal += n;
  }

  const duree = Math.round((Date.now() - debut) / 1000);

  console.log('\n=====================================');
  console.log(`✅ Import terminé en ${duree}s`);
  console.log(`📊 Total inséré : ${totalGlobal} professionnels`);
  console.log('💾 Base de données : data/rendezvoupro.db');

  db.close();
}

main().catch(err => {
  console.error('❌ Erreur fatale:', err);
  process.exit(1);
});
