# Specification de la base de données

## Données du schéma conceptuel
### Schéma relationnel
Pour modéliser cette application, le schéma relationnel est donné ci-dessous. 
Les identifiants des relations sont les attributs en italique:

- LesProduits(_idProduit_, libellé, description, prixAchat, marque, modèle, couleur, taille)

    {<id, l, d, p, m, mo, c, t> dans LesProduits <=> Le produit de libellé l, de description d, acheté au prix p, 
de marque m, de modèle mo, de couleur c et de taille t est identifié par id. }

- LesCatégories(_idProduit_, _nomCatégorie_)

    {<idp, n> dans LesCatégories <=> Le produit identifié par idp appartient à la catégorie nomCatégorie.  }

- LesStocks(_idProduit_, quantité)

    {<idp, q> dans LesStocks <=> Le produit identifié par idp est présent dans les stocks en q exemplaires. }

- LesPrix(_idProduit_, prixVente)

    {<idp, p> dans LesPrix <=> Le produit identifié par idp est vendu à prixVente euros sur le site. }

- LesCommandes(_idCommande_, idUtilisateur, date, prixTotal, statut)
    {<idC, idU, d, p, s> dans LesCommandes <=> La commande passée par l'utilisateur idU le d, pour un total de p euros,
actuellement au statut s, est identifiée par idC. }

- LesLignesDeCommande(_idLigne_, idCommande, idProduit, quantité, prixUnitaire)
    {<idL, idC, idP, q, p> dans LesLignesDeCommande <=> La ligne de commande appartenant à la commande idC,
contenant q produits d'identifiant idP au prix unitaire p est identifiée par idL. }

- LesUtilisateurs(_idUtilisateur_, nom, prenom, mdp, mail, tel)

  {<id, n, p, mdp, m, t> dans LesUtilisateurs<=> L'utilisateur de nom n, de prénom p et de mail m,
  et de numéro de téléphone portable t, se connecte grâce à l'identifiant id et le mot de passe mdp. }

- LesAdministrateurs(_idAdmin_, nom, prenom, mdp)
    
    {<idA, n, p, mdp> dans LesAdministrateurs <=> L'administrateur de nom n, de prénom p se connecte grâce
à l'identifiant idA et le mot de passe mdp. }

## Définition des domaines
### Définition

### Exemples

### Contraintes d'intégrités

### Programmes récurrents