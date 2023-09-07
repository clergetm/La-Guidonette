# Specification de la base de données

## Données du schéma conceptuel
### Schéma relationnel
Pour modéliser cette application, le schéma relationnel est donné ci-dessous. 
Les identifiants des relations sont les attributs en italique:

- LesProduits(_idProduit_, libellé, description, prixVente, marque, modèle, couleur, quantite)

    {<id, l, d, p, m, mo, c, q> dans LesProduits <=> Le produit de libellé l, de description d, vendu au prix p, 
de marque m, de modèle mo, de couleur c et présent en q exemplaires dans le stock est identifié par id. }

- LesCatégories(_idCat_, _nomCatégorie_)

    {<idc, n> dans LesCatégories <=> La catégorie nomCatégorie est identifiée par l'identifiant idc. }

- LesCommandes(_idCommande_, idUtilisateur, date, prixTotal, statut)
    {<idC, idU, d, p, s> dans LesCommandes <=> La commande passée par l'utilisateur idU le d, pour un total de p euros,
actuellement au statut s, est identifiée par idC. }

- LesUtilisateurs(_idUtilisateur_, nom, prenom, mdp, mail, tel)

  {<id, n, p, mdp, m, t> dans LesUtilisateurs<=> L'utilisateur de nom n, de prénom p et de mail m,
  et de numéro de téléphone portable t, se connecte grâce à l'identifiant id et le mot de passe mdp. }

- LesAdministrateurs(_idAdmin_, nom, prenom, mdp)
    
    {<idA, n, p, mdp> dans LesAdministrateurs <=> L'administrateur de nom n, de prénom p se connecte grâce
à l'identifiant idA et le mot de passe mdp. }

On a les relations :
- LesCatégories <-manyToMany-> LesProduits
- LesCommandes  <-manyToMany-> LesProduits

## Définition des domaines
### Définition
dom(idProduit)=dom(idCat)=dom(idUtilisateur)=dom(idAdmin)=dom(idCommande)= [1; +inf [

### Exemples

### Contraintes d'intégrités

### Programmes récurrents
