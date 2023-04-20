# ChatGPT Classifier pour lettres de motivation

L'objectif de ce projet est d'analyser automatiquement une série de fichiers textes placés dans un dossier par le Classifier ChatGPT (pour déterminer s'ils ont été rédigés par une IA).

## Dépendances

- installer Node.js (version 18 minimum)
- exécuter npm install pour télécharger automatiquement les dépendances du projet

## Exécution

- télécharger tous les fichiers texte à analyser et les mettre dans le dossier "queue"
- lancer le projet avec node index.js
- se connecter manuellement quand la page de login apparaît
- et voilà, les textes sont traités automatiquement un par un

## Exploitation des résultats

- le fichier CSV contient deux colonnes (Lettre,Resultat)
- Lettre est le nom du fichier texte analysé
- Resultat peut être :
    * The classifier considers the text to be very unlikely AI-generated.
    * The classifier considers the text to be likely AI-generated.
    * The classifier considers the text to be possibly AI-generated.
    * The classifier considers the text to be unclear if it is AI-generated.
