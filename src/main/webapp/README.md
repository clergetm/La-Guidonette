## Procédure de création de composant
-  ``cd src/main/webapp/app``
-  ``ng g c </chemin/vers/nom-composant>``
- Se déplacer dans app.routing.ts et ajouter :
```angular2html
   {
    path: '<pathname>>',
    loadChildren: () => import('./<composant>/<composant>.module').then(m => m.<Composant>Module),
   },
```

