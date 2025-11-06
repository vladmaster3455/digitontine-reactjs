# 🚀 Guide de Déploiement sur Vercel - DigiTontine React.js

Ce guide vous explique étape par étape comment déployer votre application React sur Vercel.

## 📋 Prérequis

1. Un compte Vercel (gratuit) : [vercel.com](https://vercel.com)
2. Votre backend déjà déployé (ou l'URL de votre backend)
3. Un repository Git (GitHub, GitLab, ou Bitbucket)
4. Node.js installé localement

## 🔧 Étape 1 : Préparer Git et Commit

### 1.1 Initialiser Git (si pas déjà fait)

```bash
# Vérifier si Git est déjà initialisé
git status

# Si pas initialisé, faites :
git init
```

### 1.2 Ajouter tous les fichiers

```bash
# Ajouter tous les fichiers
git add .

# Vérifier ce qui sera commité
git status
```

### 1.3 Faire le commit initial

```bash
git commit -m "Initial commit: DigiTontine React.js frontend"
```

### 1.4 Créer un repository sur GitHub/GitLab

1. Allez sur [github.com](https://github.com) ou [gitlab.com](https://gitlab.com)
2. Créez un nouveau repository (ex: `digitontne-reactjs`)
3. **Ne pas** initialiser avec README, .gitignore, ou license

### 1.5 Connecter et pousser vers GitHub/GitLab

```bash
# Ajouter le remote (remplacez par votre URL)
git remote add origin https://github.com/votre-username/digitontne-reactjs.git

# Pousser le code
git branch -M main
git push -u origin main
```

## 🚀 Étape 2 : Déployer sur Vercel

### Option A : Via l'interface Web Vercel (Recommandé)

1. **Connectez-vous à Vercel** : [vercel.com](https://vercel.com)
   - Vous pouvez vous connecter avec GitHub/GitLab

2. **Importez votre projet** :
   - Cliquez sur "Add New..." → "Project"
   - Sélectionnez votre repository `digitontne-reactjs`
   - Cliquez sur "Import"

3. **Configurez le projet** :
   - **Framework Preset** : Vite (détecté automatiquement)
   - **Root Directory** : `./` (laissez par défaut)
   - **Build Command** : `npm run build` (déjà configuré)
   - **Output Directory** : `dist` (déjà configuré)

4. **Ajoutez les variables d'environnement** :
   - Cliquez sur "Environment Variables"
   - Ajoutez :
     - **Name** : `VITE_API_BASE_URL`
     - **Value** : `https://digitontine-backend.onrender.com` (remplacez par votre URL backend)
     - **Environments** : Cochez Production, Preview, Development

5. **Déployez** :
   - Cliquez sur "Deploy"
   - Vercel va automatiquement builder et déployer votre application

### Option B : Via Vercel CLI

1. **Installer Vercel CLI** :
```bash
npm install -g vercel
```

2. **Se connecter** :
```bash
vercel login
```

3. **Déployer** :
```bash
# Dans le dossier du projet
cd "digitontne reactjs"

# Premier déploiement
vercel

# Suivez les instructions :
# - Set up and deploy? Y
# - Which scope? (sélectionnez votre compte)
# - Link to existing project? N
# - Project name? digitontne-reactjs
# - Directory? ./
# - Override settings? N
```

4. **Ajouter les variables d'environnement** :
```bash
vercel env add VITE_API_BASE_URL
# Entrez la valeur : https://votre-backend.onrender.com
# Sélectionnez les environnements : Production, Preview, Development
```

5. **Déployer en production** :
```bash
vercel --prod
```

## ⚙️ Configuration des Variables d'Environnement

Dans Vercel Dashboard > Votre projet > Settings > Environment Variables :

| Name | Value | Environments |
|------|-------|---------------|
| `VITE_API_BASE_URL` | `https://votre-backend.onrender.com` | Production, Preview, Development |

**Important** : 
- Remplacez `https://votre-backend.onrender.com` par l'URL réelle de votre backend
- Les variables doivent commencer par `VITE_` pour être accessibles dans Vite
- Redéployez après avoir ajouté/modifié les variables

## 🔄 Déploiement Automatique

Vercel déploie automatiquement :
- **Production** : À chaque push sur la branche principale (`main` ou `master`)
- **Preview** : À chaque push sur les autres branches (pour tester)
- **Pull Requests** : Crée automatiquement un preview pour chaque PR

## 📝 Configuration CORS sur le Backend

Assurez-vous que votre backend autorise les requêtes depuis votre domaine Vercel :

Dans votre backend, configurez CORS pour autoriser :
```javascript
const allowedOrigins = [
  'https://digitontne-reactjs.vercel.app',
  'https://digitontne-reactjs-git-main.vercel.app', // Preview
  // ... autres origines
];
```

Ou pour autoriser tous les sous-domaines Vercel :
```javascript
const allowedOrigins = [
  /^https:\/\/.*\.vercel\.app$/,
  // ... autres origines
];
```

## 🎯 URLs de Production

Après le déploiement, votre application sera accessible sur :
- **Production** : `https://digitontne-reactjs.vercel.app`
- **Custom Domain** : Si vous configurez un domaine personnalisé

## 🛠️ Commandes Utiles

### Voir les logs
```bash
vercel logs
```

### Redéployer manuellement
Dans Vercel Dashboard > Votre projet > Deployments > Cliquez sur "..." > "Redeploy"

### Rollback
Dans Vercel Dashboard > Votre projet > Deployments > Sélectionnez une version précédente > "Promote to Production"

### Voir les variables d'environnement
```bash
vercel env ls
```

## 🔍 Vérification Post-Déploiement

1. **Vérifiez l'URL** : Votre app devrait être accessible
2. **Testez la connexion** : Essayez de vous connecter
3. **Vérifiez la console** : Ouvrez les DevTools pour voir les erreurs éventuelles
4. **Vérifiez les logs** : Dans Vercel Dashboard > Deployments > Cliquez sur un déploiement > Logs

## 🆘 Problèmes Courants

### Build échoue
- Vérifiez les logs dans Vercel Dashboard
- Assurez-vous que `package.json` est correct
- Vérifiez que toutes les dépendances sont listées
- Vérifiez que Node.js version est compatible (Vercel utilise Node 18+ par défaut)

### Erreur 404 sur les routes
- Le fichier `vercel.json` devrait résoudre ce problème
- Vérifiez que le fichier `vercel.json` est à la racine du projet

### Erreur CORS
- Vérifiez que votre backend autorise votre domaine Vercel
- Vérifiez la variable `VITE_API_BASE_URL`

### Variables d'environnement non prises en compte
- Les variables doivent commencer par `VITE_`
- Redéployez après avoir ajouté/modifié les variables
- Vérifiez que les variables sont ajoutées pour les bons environnements

### Erreur "Module not found"
- Vérifiez que toutes les dépendances sont dans `package.json`
- Supprimez `node_modules` et `package-lock.json`, puis refaites `npm install`

## 📊 Monitoring

Vercel fournit :
- **Analytics** : Visiteurs, pages vues, etc.
- **Speed Insights** : Performance de votre site
- **Logs** : Logs en temps réel
- **Deployments** : Historique de tous les déploiements

## 💰 Plan Gratuit

Le plan gratuit de Vercel inclut :
- ✅ Déploiement automatique illimité
- ✅ HTTPS automatique
- ✅ Custom domain
- ✅ Analytics de base
- ✅ 100 GB bandwidth/mois
- ✅ Pas de limite de déploiements

## 🎉 C'est tout !

Votre application devrait maintenant être déployée et accessible en ligne !

### Prochaines étapes

1. Configurez un domaine personnalisé (optionnel)
2. Activez Analytics pour suivre les visiteurs
3. Configurez les webhooks pour les notifications

