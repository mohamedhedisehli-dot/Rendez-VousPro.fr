# 🚀 rendezvouPro — Déploiement Vercel

## Structure du projet

```
rendezvoupro-deploy/
├── vercel.json          ← Config Vercel
└── public/
    ├── index.html       ← Landing page principale
    └── app.html         ← Prototype complet (toutes les screens)
```

URLs une fois déployé :
- `/`     → Landing page (hero, secteurs, stats)
- `/app`  → Prototype complet (recherche, RDV, dashboard pro)

---

## Déploiement en 3 étapes

### 1. Installe Vercel CLI
```bash
npm install -g vercel
```

### 2. Depuis ce dossier, lance :
```bash
vercel
```
- Connecte-toi avec GitHub ou email
- Réponds **Entrée** à toutes les questions (valeurs par défaut)
- Tu obtiens une URL de preview : `https://rendezvoupro-xxxx.vercel.app`

### 3. Mise en production :
```bash
vercel --prod
```
→ URL finale : `https://rendezvoupro.vercel.app`

---

## Domaine personnalisé (optionnel)

Dans le dashboard Vercel → **Settings → Domains** :
1. Ajoute ton domaine ex. `rendezvoupro.fr`
2. Copie les DNS indiqués chez ton registrar (OVH, Gandi, etc.)
3. Propagation : 5–30 min

---

## Mises à jour

Pour re-déployer après modification d'un fichier :
```bash
vercel --prod
```
C'est tout.

---

## Besoin d'aide ?
- Doc Vercel : https://vercel.com/docs
- Support : https://vercel.com/support
