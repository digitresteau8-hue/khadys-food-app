
# KHADY'S FOOD & EVENT - App Mobile (PWA)

Une application professionnelle hybride (Web & Mobile PWA) pour la vente de nourriture à Niamey.

## 📱 Fonctionnalités PWA

Cette application est une **Progressive Web App**.
- **Installation** : Sur Android (Chrome) ou iOS (Safari), utilisez l'option "Ajouter à l'écran d'accueil".
- **Offline** : L'application fonctionne partiellement hors connexion grâce au Service Worker (`sw.js`).
- **Look Natif** : L'interface est conçue comme une application mobile (Barre de navigation en bas, "Bonjour ✋🏾" animé, carousel de plats).

## 🗄️ Configuration de la Base de Données (SQL)

Pour rendre l'application dynamique (Packs, Box, Menu, Avis), suivez ces étapes :

1.  Créez un projet sur **[Supabase](https://supabase.com)**.
2.  Allez dans la section **SQL Editor**.
3.  Copiez le contenu du fichier `db_schema.sql` (inclus dans ce projet).
4.  Collez-le et cliquez sur **RUN**. Cela créera les tables `menu_items`, `reviews` et `orders`.
5.  Récupérez vos clés API (URL et ANON KEY) dans les paramètres du projet Supabase.
6.  Connectez-les à vos variables d'environnement (`VITE_SUPABASE_URL`, etc.).

## 🚀 Déploiement

1.  Hébergez ce code sur GitHub.
2.  Connectez le dépôt à **Vercel**.
3.  L'application sera automatiquement détectée et déployée.
