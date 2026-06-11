// ============================================================
// stats.js — Affiche les statistiques de la base
// ============================================================
import { openDB } from './database.js';

function main() {
  const db = openDB();

  console.log('\n📊 rendezvouPro — Statistiques de la base');
  console.log('==========================================\n');

  // Total global
  const total = db.prepare('SELECT COUNT(*) as n FROM professionnels').get();
  const inscrits = db.prepare('SELECT COUNT(*) as n FROM professionnels WHERE inscrit = 1').get();
  const actifs = db.prepare('SELECT COUNT(*) as n FROM professionnels WHERE actif = 1').get();
  const avecCoords = db.prepare('SELECT COUNT(*) as n FROM professionnels WHERE latitude IS NOT NULL').get();

  console.log(`👥 Total professionnels : ${total.n.toLocaleString()}`);
  console.log(`✅ Inscrits (RDV en ligne) : ${inscrits.n.toLocaleString()}`);
  console.log(`🟢 Actifs : ${actifs.n.toLocaleString()}`);
  console.log(`📍 Géolocalisés : ${avecCoords.n.toLocaleString()}`);

  // Par secteur
  console.log('\n📂 Par secteur :');
  console.log('─'.repeat(50));
  const parSecteur = db.prepare(`
    SELECT secteur_id, COUNT(*) as n
    FROM professionnels
    GROUP BY secteur_id
    ORDER BY n DESC
  `).all();

  parSecteur.forEach(row => {
    const bar = '█'.repeat(Math.min(30, Math.round(row.n / (total.n / 30))));
    console.log(`  ${row.secteur_id.padEnd(15)} ${String(row.n).padStart(6)} ${bar}`);
  });

  // Par département (top 10)
  console.log('\n🗺️  Top 10 départements :');
  console.log('─'.repeat(40));
  const parDept = db.prepare(`
    SELECT departement, COUNT(*) as n
    FROM professionnels
    WHERE departement IS NOT NULL
    GROUP BY departement
    ORDER BY n DESC
    LIMIT 10
  `).all();

  parDept.forEach((row, i) => {
    console.log(`  ${String(i+1).padStart(2)}. Dép. ${row.departement.padEnd(5)} → ${row.n.toLocaleString()} professionnels`);
  });

  // Logs d'import
  console.log('\n📋 Derniers imports :');
  console.log('─'.repeat(60));
  const logs = db.prepare(`
    SELECT secteur_id, nb_inseres, nb_traites, statut, date_debut
    FROM import_logs
    ORDER BY id DESC
    LIMIT 10
  `).all();

  logs.forEach(log => {
    const date = log.date_debut?.slice(0, 16) || '—';
    console.log(`  [${date}] ${log.secteur_id?.padEnd(15)} → ${log.nb_inseres} insérés / ${log.nb_traites} traités — ${log.statut}`);
  });

  console.log('\n==========================================\n');
  db.close();
}

main();
