// ============================================================
// run-all.js — Lance toutes les étapes d'import
// ============================================================
import { execSync } from 'child_process';

const steps = [
  { cmd: 'node src/import-sirene.js', label: '1️⃣  Import Sirene INSEE' },
  { cmd: 'node src/stats.js',         label: '2️⃣  Statistiques finales' },
];

console.log('🚀 rendezvouPro — Pipeline complet\n');

for (const step of steps) {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`▶  ${step.label}`);
  console.log('='.repeat(50));
  try {
    execSync(step.cmd, { stdio: 'inherit' });
  } catch (err) {
    console.error(`❌ Échec : ${step.label}`);
    process.exit(1);
  }
}

console.log('\n✅ Pipeline terminé avec succès !');
