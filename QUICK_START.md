# 🚀 Guide de Démarrage Rapide - DigiTontine React.js

## Installation

```bash
# 1. Installer les dépendances
npm install

# 2. Créer le fichier .env
cp env.example .env

# 3. Modifier .env avec votre URL backend
# VITE_API_BASE_URL=http://localhost:5000

# 4. Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

## 📁 Structure du Projet

```
digitontne reactjs/
├── src/
│   ├── components/      # Composants réutilisables
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Layout.jsx
│   │   ├── Loading.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/        # Context API
│   │   └── AuthContext.jsx
│   ├── pages/          # Pages de l'application
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Tontines.jsx
│   │   └── Transactions.jsx
│   ├── services/       # Services API
│   │   ├── api.js
│   │   └── auth.service.js
│   ├── config/         # Configuration
│   │   └── api.config.js
│   ├── App.jsx         # Composant principal
│   └── main.jsx        # Point d'entrée
├── public/             # Fichiers statiques
├── package.json
└── vite.config.js
```

## 🎨 Fonctionnalités

✅ Authentification en 2 étapes (Login + OTP)
✅ Dashboard avec statistiques
✅ Gestion des tontines
✅ Gestion des transactions
✅ Design responsive (Mobile, Tablette, Desktop)
✅ Navigation avec sidebar
✅ Protection des routes

## 🔐 Authentification

L'application utilise un système d'authentification en 2 étapes :
1. **Étape 1** : Connexion avec email/téléphone et mot de passe
2. **Étape 2** : Vérification du code OTP envoyé par email

## 📱 Responsive Design

L'application est entièrement responsive :
- **Mobile** : Sidebar en overlay avec menu hamburger
- **Tablette** : Layout adaptatif
- **Desktop** : Sidebar fixe à gauche

## 🚢 Déploiement

Voir le fichier `DEPLOYMENT.md` pour les instructions complètes de déploiement.

### Déploiement rapide sur Vercel :

```bash
npm i -g vercel
vercel login
vercel
```

N'oubliez pas de configurer la variable d'environnement `VITE_API_BASE_URL` !

## 🛠️ Commandes Disponibles

- `npm run dev` - Lancer le serveur de développement
- `npm run build` - Build pour la production
- `npm run preview` - Prévisualiser le build de production
- `npm run lint` - Vérifier le code avec ESLint

## 📝 Notes Importantes

1. **Variables d'environnement** : Assurez-vous de configurer `VITE_API_BASE_URL` dans votre fichier `.env`
2. **CORS** : Vérifiez que votre backend autorise les requêtes depuis votre domaine frontend
3. **Token** : Le token JWT est stocké dans `localStorage` et ajouté automatiquement aux requêtes

## 🆘 Problèmes Courants

### L'application ne se connecte pas au backend
- Vérifiez que `VITE_API_BASE_URL` est correctement configuré
- Vérifiez que le backend est accessible
- Vérifiez les logs de la console du navigateur

### Erreur CORS
- Configurez CORS sur votre backend pour autoriser votre domaine frontend
- En développement, le backend doit autoriser `http://localhost:3000`

## 📞 Support

Pour toute question ou problème, consultez la documentation ou les logs de l'application.

