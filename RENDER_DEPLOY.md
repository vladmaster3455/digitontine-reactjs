# 🚀 Guide de Déploiement sur Render - DigiTontine React.js

Ce guide vous explique étape par étape comment déployer votre application React sur Render.

## 📋 Prérequis

1. Un compte Render (gratuit) : [render.com](https://render.com)
2. Votre backend déjà déployé (ou l'URL de votre backend)
3. Un repository Git (GitHub, GitLab, ou Bitbucket)

## 🔧 Étape 1 : Préparer le Repository

1. **Initialisez Git** (si pas déjà fait) :
```bash
git init
git add .
git commit -m "Initial commit"
```

2. **Poussez vers GitHub/GitLab** :
```bash
git remote add origin https://github.com/votre-username/digitontne-reactjs.git
git push -u origin main
```

## 🚀 Étape 2 : Déployer sur Render

### Option A : Via l'interface Web Render

1. **Connectez-vous à Render** : [dashboard.render.com](https://dashboard.render.com)

2. **Créez un nouveau service** :
   - Cliquez sur "New +"
   - Sélectionnez "Static Site"

3. **Configurez le service** :
   - **Name** : `digitontne-reactjs` (ou le nom de votre choix)
   - **Repository** : Connectez votre repository Git
   - **Branch** : `main` (ou `master`)
   - **Root Directory** : Laissez vide (racine du projet)
   - **Build Command** : `npm install && npm run build`
   - **Publish Directory** : `dist`

4. **Ajoutez les variables d'environnement** :
   - Cliquez sur "Environment"
   - Ajoutez :
     - **Key** : `VITE_API_BASE_URL`
     - **Value** : `https://votre-backend.onrender.com` (ou votre URL backend)

5. **Déployez** :
   - Cliquez sur "Create Static Site"
   - Render va automatiquement builder et déployer votre application

### Option B : Via render.yaml (Recommandé)

1. **Le fichier `render.yaml` est déjà créé** dans votre projet

2. **Sur Render Dashboard** :
   - Cliquez sur "New +"
   - Sélectionnez "Blueprint"
   - Connectez votre repository
   - Render détectera automatiquement le fichier `render.yaml`

3. **Configurez les variables d'environnement** :
   - Dans les paramètres du service
   - Ajoutez `VITE_API_BASE_URL` avec l'URL de votre backend

## ⚙️ Configuration des Variables d'Environnement

Dans Render Dashboard, allez dans votre service > Environment et ajoutez :

| Key | Value | Description |
|-----|-------|-------------|
| `VITE_API_BASE_URL` | `https://votre-backend.onrender.com` | URL de votre backend API |

**Important** : 
- Remplacez `https://votre-backend.onrender.com` par l'URL réelle de votre backend
- Les variables d'environnement doivent commencer par `VITE_` pour être accessibles dans Vite

## 🔄 Déploiement Automatique

Render déploie automatiquement à chaque push sur votre branche principale :
- Chaque commit déclenche un nouveau build
- Les déploiements sont automatiques
- Vous pouvez voir les logs en temps réel

## 📝 Configuration CORS sur le Backend

Assurez-vous que votre backend autorise les requêtes depuis votre domaine Render :

Dans votre backend, configurez CORS pour autoriser :
```javascript
const allowedOrigins = [
  'https://votre-app.onrender.com',
  // ... autres origines
];
```

## 🎯 URL de Production

Après le déploiement, votre application sera accessible sur :
```
https://digitontne-reactjs.onrender.com
```
(ou le nom que vous avez choisi)

## 🛠️ Commandes Utiles

### Voir les logs
Dans Render Dashboard > Votre service > Logs

### Redéployer manuellement
Dans Render Dashboard > Votre service > Manual Deploy

### Rollback
Dans Render Dashboard > Votre service > Deploys > Sélectionnez une version précédente

## 🔍 Vérification Post-Déploiement

1. **Vérifiez l'URL** : Votre app devrait être accessible
2. **Testez la connexion** : Essayez de vous connecter
3. **Vérifiez la console** : Ouvrez les DevTools pour voir les erreurs éventuelles
4. **Vérifiez les logs** : Dans Render Dashboard pour voir les erreurs de build

## 🆘 Problèmes Courants

### Build échoue
- Vérifiez les logs dans Render Dashboard
- Assurez-vous que `package.json` est correct
- Vérifiez que toutes les dépendances sont listées

### Erreur 404 sur les routes
- Le fichier `_redirects` devrait résoudre ce problème
- Vérifiez que le fichier est dans le dossier `public/`

### Erreur CORS
- Vérifiez que votre backend autorise votre domaine Render
- Vérifiez la variable `VITE_API_BASE_URL`

### Variables d'environnement non prises en compte
- Les variables doivent commencer par `VITE_`
- Redéployez après avoir ajouté/modifié les variables

## 📊 Monitoring

Render fournit :
- **Logs en temps réel** : Voir les erreurs et les requêtes
- **Métriques** : CPU, mémoire, etc.
- **Alertes** : Notifications en cas de problème

## 💰 Plan Gratuit

Le plan gratuit de Render inclut :
- ✅ Déploiement automatique
- ✅ HTTPS automatique
- ✅ Custom domain
- ⚠️ Service peut "s'endormir" après 15 min d'inactivité (première requête sera lente)

## 🎉 C'est tout !

Votre application devrait maintenant être déployée et accessible en ligne !

