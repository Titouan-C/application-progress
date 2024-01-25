# Suivi de candidatures

Ce projet est une application web développée en Angular qui permet de suivre les candidatures. Il offre deux pages principales : une liste des candidatures avec la possibilité d'ajouter une nouvelle candidature et de la modifier, et une page d'administration avec la liste des statuts possibles pour les candidatures, avec la possibilité d'ajouter un nouveau statut et de le modifier.

## Fonctionnalités

- **Liste des candidatures** : Les utilisateurs peuvent voir toutes leurs candidatures, ajouter une nouvelle candidature et modifier une candidature existante.
- **Administration** : Seuls les utilisateurs ayant un token spécifique (une variable "token" égale à "MR742mynp9JXZ8t37wRJP75K") dans leur localStorage peuvent accéder à cette page. Les administrateurs peuvent voir tous les statuts possibles pour les candidatures, ajouter un nouveau statut et modifier un statut existant.
  - Lorsqu'un statut existant est modifié, toutes les entreprises qui ont ce statut sont également mises à jour pour refléter le nouveau statut. Cela garantit que les informations sur les entreprises restent cohérentes et à jour.

## Technologies utilisées

- Framework : Angular
- Base de données : IndexedDB
- Stockage local : LocalStorage du navigateur de l'utilisateur (pour le token)
- Conteneurisation : Docker (possibilité d'utiliser WAMP, XAMP, etc)

## Démarrage rapide

Pour exécuter l'application localement, suivez les étapes ci-dessous :

1. Clonez le [repository](https://github.com/Titouan-C/application-progress).
2. Installez les dépendances nécessaires avec `npm install`.
3. Générez le dossier `dist` avec `ng build` (pour rendre l'application web téléchargeable) (*optionnel - voir la partie "Déploiement"*).
4. Exécutez l'application avec `npm install` (ou `ng serve`).

## Structure du projet

Le projet est structuré comme suit :

- `src/app` : Contient les modules et guard de l'application (`admin`, `company`, `auth` (guard), `public`, `shared`).
- `src/assets` : Contient les images utilisées dans le site web.
- `src/shared` : Contient les modèles (`models`) et les services (`services`) de l'application, ainsi que la classe qui gère la base de données IndexedDB (`indexed-db.ts`).

## Déploiement

Pour déployer l'application, vous pouvez utiliser un conteneur Docker avec le fichier `Dockerfile` fourni. Vous pouvez également placer le dossier `dist` généré dans un serveur WAMP, XAMP ou autre. Assurez-vous d'avoir généré le dossier `dist` avant de déployer l'application.

## Routes

L'application utilise un système de routage dynamique pour charger les modules nécessaires. Toutes les routes sont gérées automatiquement via la barre de navigation ou des boutons sur le site, il n'est donc pas nécessaire de les taper manuellement. Voici les routes principales :

- `/company` : Charge le module `CompanyModule`. Ce module comprend les routes suivantes :
 - `/edit/:id` : Ouvre le formulaire de modification pour la candidature spécifiée par `:id`.
 - `/list` : Affiche la liste de toutes les candidatures.
 - `/:id` : Ouvre le formulaire de création pour une nouvelle candidature. Si `:id` est spécifié, cela ouvrira le formulaire de modification pour la candidature spécifiée par `:id`.
- `/admin` : Charge le module `AdminModule`. Ce module comprend les routes suivantes :
 - `/dashboard` : Affiche le tableau de bord de l'administration.

---

© 2024 - Tom H, Sebastian B, Titouan C