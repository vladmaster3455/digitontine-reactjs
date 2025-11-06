# DigiTontine - Frontend React.js

Application web moderne pour la gestion de tontines digitales, construite avec React et Vite.

## 🚀 Technologies

- **React 18** - Bibliothèque UI
- **Vite** - Build tool rapide
- **React Router** - Navigation
- **Axios** - Client HTTP
- **Tailwind CSS** - Framework CSS utilitaire
- **Lucide React** - Icônes

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour la production
npm run build

# Prévisualiser le build de production
npm run preview
```

## ⚙️ Configuration

Créez un fichier `.env` à la racine du projet :

```env
VITE_API_BASE_URL=http://localhost:5000
```

Pour la production, utilisez l'URL de votre backend déployé.

## 📁 Structure du projet

```
src/
├── components/       # Composants réutilisables
├── context/         # Context API (Auth, etc.)
├── pages/           # Pages de l'application
├── services/        # Services API
├── config/          # Configuration
└── App.jsx          # Composant principal
```

## 🔐 Authentification

L'application utilise un système d'authentification en 2 étapes :
1. Connexion avec identifiant et mot de passe
2. Vérification du code OTP envoyé par email

## 🎨 Design

- Design moderne et responsive
- Compatible mobile, tablette et desktop
- Interface utilisateur intuitive

## 📱 Responsive

L'application est entièrement responsive et s'adapte à tous les écrans :
- Mobile (< 640px)
- Tablette (640px - 1024px)
- Desktop (> 1024px)

## 🚢 Déploiement

### Vercel / Netlify

1. Connectez votre repository
2. Configurez la variable d'environnement `VITE_API_BASE_URL`
3. Déployez !

### Build manuel

```bash
npm run build
```

Les fichiers de production seront dans le dossier `dist/`.

## 📝 License

Propriétaire - DigiTontine

