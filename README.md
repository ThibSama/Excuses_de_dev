# Excuses de Dev

## Fonctionnalités

- **Page principale (`/`)** : Affiche une excuse aléatoire avec des boutons pour générer une nouvelle excuse ou en ajouter une via une modale.
- **Page `/lost`** : Affiche un GIF humoristique et redirige vers la page principale après 5 secondes.
- **Page `/:http_code`** : Affiche l’excuse correspondant au code HTTP (ex. `/701` pour "Meh").
- **Page 404** : Affiche une erreur pour les routes inconnues (ex. `/quelquechose`).
- **Style** : Dégradé indigo-violet-rose, animations fluides (fade-in, slide-up) avec Tailwind CSS.

## Prérequis

- Node.js (v18 ou supérieur) et npm.
- MySQL (v8.0 ou supérieur).
- Ports 3000 (frontend) et 3001 (backend) libres.

## Installation

1. **Cloner ou décompresser le projet** :
   ```bash
   cd Excuses_de_dev
   ```

Configurer MySQL :

Importez le fichier init.sql pour créer la base de données excuses_de_dev et initialiser les tables et données :mysql -u root -p < init.sql

Remplacez root par votre utilisateur MySQL et entrez votre mot de passe lorsque demandé.
Le fichier crée :
La base excuses_de_dev.
Les tables tags (9 tags) et excuses (67 excuses).
Les données initiales, comme 701: Meh et 710: PHP.

Configurer le backend :

Naviguez dans le dossier backend :cd backend

Mettez à jour backend/config/db.js avec vos identifiants MySQL (utilisateur et mot de passe).
Installez les dépendances et lancez le serveur :npm install
npm start

L’API sera disponible à http://localhost:3001.

Configurer le frontend :

Naviguez dans le dossier frontend :cd ../frontend

Installez les dépendances et lancez l’application :npm install
npm start

L’application sera disponible à http://localhost:3000.

Accéder à l’application :

Page principale : http://localhost:3000
Exemple d’excuse : http://localhost:3000/701
Page perdue : http://localhost:3000/lost
Page 404 : http://localhost:3000/quelquechose

Tests
Le projet inclut des tests unitaires pour le frontend et des tests d’intégration pour le backend.
Frontend

Tests unitaires pour les composants React avec Jest, React Testing Library, et jest-dom.
Dépendances : @testing-library/react, @testing-library/user-event, @testing-library/jest-dom, jest-fetch-mock.
Les tests simulent les appels API avec jest-fetch-mock dans MainPage.test.jsx.
Note : Les tests frontend (MainPage.test.jsx) ne passent pas actuellement en raison d’un problème de configuration avec jest-fetch-mock (erreur : TypeError: \_jestFetchMock.default.mock is not a function). Cela est probablement dû à une incompatibilité ou une mauvaise initialisation du module.
Exécuter les tests :cd frontend
npm test

Backend

Tests d’intégration pour les endpoints API avec Jest et Supertest, utilisant une base de données MySQL de test (excuses_de_dev_test).
Dépendances : jest, supertest, mysql2.
Avant de lancer les tests, assurez-vous que MySQL est en cours d’exécution et que backend/config/db_test.js contient vos identifiants MySQL (utilisateur root, mot de passe).
Exécuter les tests :cd backend
npm test
