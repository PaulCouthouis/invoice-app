# Kata : Impression d'une facture à partir d'un panier de produits

## Installation et lancement des tests
```
  pnpm / yarn / npm install
  pnpm test / yarn test / npm test
```

## Contraintes
Entrainement réalisé en programmation orientée "fonctionnelle" avec des règles eslint spécifiques.

## Périmètre
Le kata se limite au coeur du domaine et ne possède qu'une seule user story. 
Il contient : 
- un input port pour une éventuelle connexion avec un base de donnée ou une API
- un output port pour une éventuelle connexion avec une UI

## Énoncé
Étant donné trois types de produits :
- Les produits de première nécessité comme la nourriture et les médicaments, taxés à 0%
- Les livres taxés à 10%
- Les autres produits taxés à 20 %

On souhaite imprimer une facture suivant une liste de produits contenu dans un panier. Les valeurs affichées sont: 
- pour chaque produit, sa quantité, son prix unitaire HT et son prix total TTC en fonction de la quantité
- le total des taxes du panier
- le total TTC du panier


### Exemple 1

#### Input
```
* 1 jeu Switch à 49.99€
* 3 boites de chocolats à 12.98€
* 2 livres à 15.55€
```

#### Output
```
* 1 jeu(x) Switch à 49.99€ : 59.99€ TTC
* 3 boite(s) de chocolat à 12.98€ : 38.94€ TTC
* 2 livre(s) à 15.55€ : 34.21€ TTC

Montant des taxes : 13.11€
Total : 133.14€
```

### Exemple 2

#### Input
```
* 2 médicaments à 4.00€
* 1 jouet à 27.55€
* 1 DVD à 14.99€
```

#### Output
```
* 2 médicament(s) à 4.00€ : 8.00€ TTC
* 1 jouet(s) à 27.55€ : 33.06€ TTC
* 1 DVD à 14.99€ : 17.99€ TTC
      
Montant des taxes : 8.51€
Total : 59.05€
```