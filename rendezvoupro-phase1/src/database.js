// ============================================================
// database.js — Schéma SQLite rendezvouPro
// ============================================================
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, '../data/rendezvoupro.db');

export function openDB() {
  const db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  return db;
}

export function initDB() {
  const db = openDB();

  db.exec(`
    -- ── PROFESSIONNELS ──────────────────────────────────────
    CREATE TABLE IF NOT EXISTS professionnels (
      id              INTEGER PRIMARY KEY AUTOINCREMENT,
      siret           TEXT UNIQUE,
      siren           TEXT,
      nom             TEXT NOT NULL,
      enseigne        TEXT,
      secteur_id      TEXT NOT NULL,
      code_naf        TEXT,
      sous_secteur     TEXT,

      -- Adresse
      adresse         TEXT,
      complement      TEXT,
      code_postal     TEXT,
      ville           TEXT,
      departement     TEXT,
      region          TEXT,
      latitude        REAL,
      longitude       REAL,

      -- Contact (enrichi)
      telephone       TEXT,
      email           TEXT,
      site_web        TEXT,

      -- Horaires (JSON)
      horaires        TEXT,

      -- Statut
      inscrit         INTEGER DEFAULT 0,  -- 1 = inscrit sur rendezvouPro
      actif           INTEGER DEFAULT 1,
      source          TEXT DEFAULT 'sirene',
      date_import     TEXT DEFAULT (datetime('now')),
      date_maj        TEXT DEFAULT (datetime('now'))
    );

    -- ── INDEX PERFORMANCE ───────────────────────────────────
    CREATE INDEX IF NOT EXISTS idx_pro_secteur   ON professionnels(secteur_id);
    CREATE INDEX IF NOT EXISTS idx_pro_cp        ON professionnels(code_postal);
    CREATE INDEX IF NOT EXISTS idx_pro_ville     ON professionnels(ville);
    CREATE INDEX IF NOT EXISTS idx_pro_naf       ON professionnels(code_naf);
    CREATE INDEX IF NOT EXISTS idx_pro_inscrit   ON professionnels(inscrit);
    CREATE INDEX IF NOT EXISTS idx_pro_coords    ON professionnels(latitude, longitude);

    -- ── CRÉNEAUX ────────────────────────────────────────────
    CREATE TABLE IF NOT EXISTS creneaux (
      id              INTEGER PRIMARY KEY AUTOINCREMENT,
      pro_id          INTEGER NOT NULL REFERENCES professionnels(id),
      date            TEXT NOT NULL,
      heure_debut     TEXT NOT NULL,
      heure_fin       TEXT NOT NULL,
      disponible      INTEGER DEFAULT 1,
      rdv_id          INTEGER
    );

    CREATE INDEX IF NOT EXISTS idx_creneau_pro   ON creneaux(pro_id);
    CREATE INDEX IF NOT EXISTS idx_creneau_date  ON creneaux(date);

    -- ── RENDEZ-VOUS ─────────────────────────────────────────
    CREATE TABLE IF NOT EXISTS rendez_vous (
      id              INTEGER PRIMARY KEY AUTOINCREMENT,
      creneau_id      INTEGER NOT NULL REFERENCES creneaux(id),
      pro_id          INTEGER NOT NULL REFERENCES professionnels(id),
      nom_client      TEXT NOT NULL,
      tel_client      TEXT NOT NULL,
      email_client    TEXT,
      motif           TEXT,
      statut          TEXT DEFAULT 'en_attente', -- confirmé, annulé, terminé
      date_creation   TEXT DEFAULT (datetime('now')),
      ref             TEXT UNIQUE
    );

    -- ── LOGS IMPORT ─────────────────────────────────────────
    CREATE TABLE IF NOT EXISTS import_logs (
      id              INTEGER PRIMARY KEY AUTOINCREMENT,
      source          TEXT,
      secteur_id      TEXT,
      nb_traites      INTEGER DEFAULT 0,
      nb_inseres      INTEGER DEFAULT 0,
      nb_erreurs      INTEGER DEFAULT 0,
      date_debut      TEXT DEFAULT (datetime('now')),
      date_fin        TEXT,
      statut          TEXT DEFAULT 'en_cours'
    );
  `);

  console.log('✅ Base de données initialisée →', DB_PATH);
  db.close();
  return DB_PATH;
}

export default { openDB, initDB };
