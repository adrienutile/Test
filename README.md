# ⚔️ Dofus Rétro Speedrun — V2 React

Application PWA installable depuis Chrome, sans APK.

**Stack :** React, TypeScript, Vite, Framer Motion, Lucide, vite-plugin-pwa.

## Installation locale

```bash
npm install
mkdir -p public/assets
cp -R assets/. public/assets/
npm run dev
```

## Publication GitHub Pages

Le workflow `.github/workflows/deploy.yml` construit l'application et publie `dist`.

**Action nécessaire une seule fois :** Settings → Pages → Build and deployment → Source : **GitHub Actions**.

Lien attendu : https://adrienutile.github.io/Test/

## Données

Le format des sauvegardes reste compatible avec l'application originale. Le navigateur stocke les runs dans `dofus-runs-prod-v2`. Pour déplacer les données entre la production et le dépôt Test, utiliser Exporter puis Importer.

La production `Speedrun-timer-Dofus-retro` reste inchangée.
