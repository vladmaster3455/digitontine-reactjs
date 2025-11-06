# Guide de Déploiement - DigiTontine React.js

Ce guide vous explique comment déployer l'application DigiTontine React.js sur différentes plateformes.

## 📋 Prérequis

- Node.js 18+ installé
- Compte sur la plateforme de déploiement choisie
- URL de votre backend API

## 🔧 Configuration

1. Créez un fichier `.env` à la racine du projet :

```env
VITE_API_BASE_URL=https://votre-backend.com
```

2. Installez les dépendances :

```bash
npm install
```

3. Testez en local :

```bash
npm run dev
```

## 🚀 Déploiement sur Vercel

### Option 1 : Via l'interface Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Connectez votre repository GitHub/GitLab
3. Ajoutez la variable d'environnement :
   - **Name**: `VITE_API_BASE_URL`
   - **Value**: URL de votre backend
4. Cliquez sur "Deploy"

### Option 2 : Via CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Ajouter la variable d'environnement
vercel env add VITE_API_BASE_URL
```

## 🌐 Déploiement sur Netlify

### Option 1 : Via l'interface Netlify

1. Allez sur [netlify.com](https://netlify.com)
2. Connectez votre repository
3. Configurez le build :
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Ajoutez la variable d'environnement dans "Site settings" > "Environment variables"
5. Déployez

### Option 2 : Via CLI

```bash
# Installer Netlify CLI
npm i -g netlify-cli

# Se connecter
netlify login

# Initialiser
netlify init

# Déployer
netlify deploy --prod
```

## 📦 Déploiement sur GitHub Pages

1. Installez `gh-pages` :

```bash
npm install --save-dev gh-pages
```

2. Ajoutez dans `package.json` :

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://votre-username.github.io/digitontne-reactjs"
}
```

3. Déployez :

```bash
npm run deploy
```

## 🐳 Déploiement avec Docker

1. Créez un `Dockerfile` :

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

2. Créez `nginx.conf` :

```nginx
server {
  listen 80;
  server_name localhost;
  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

3. Build et run :

```bash
docker build -t digitontne-reactjs .
docker run -p 80:80 digitontne-reactjs
```

## ⚙️ Variables d'environnement

Assurez-vous de configurer ces variables selon votre environnement :

- **VITE_API_BASE_URL** : URL de base de votre API backend

## 🔒 Sécurité

- Ne commitez jamais le fichier `.env`
- Utilisez les variables d'environnement de votre plateforme
- Configurez CORS correctement sur votre backend

## 📝 Notes

- Le build de production optimise automatiquement le code
- Les assets sont minifiés et compressés
- Le routing fonctionne avec React Router (SPA)

## 🆘 Support

En cas de problème, vérifiez :
1. Les variables d'environnement sont correctement configurées
2. L'URL du backend est accessible
3. Les logs de build pour les erreurs

