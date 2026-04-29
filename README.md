# Programmation Sportive — Guide de déploiement

## Structure des fichiers

```
/
├── index.html                  ← Ta page principale (modifiée)
├── admin.html                  ← Panneau admin (protégé par mot de passe)
├── netlify.toml                ← Config Netlify
└── netlify/
    └── functions/
        └── prog.mjs            ← Function pour la persistance multi-appareils
```

---

## Étape 1 — Changer le mot de passe

Dans **`admin.html`**, ligne ~10 :
```js
const PASSWORD = 'coach2024'; // ← change ça !
```

---

## Étape 2 — Déployer sur Netlify

### Option A — Via l'interface Netlify (le plus simple)

1. Va sur [netlify.com](https://netlify.com) et connecte-toi
2. **New site → Deploy manually**
3. Glisse-dépose le **dossier entier** dans la zone de dépôt
4. Ton site est en ligne !

### Option B — Via GitHub (recommandé pour les mises à jour faciles)

1. Crée un repo GitHub avec ces fichiers
2. Sur Netlify : **New site → Import from Git**
3. Sélectionne ton repo
4. Build command : *(laisser vide)*
5. Publish directory : `.`
6. **Deploy site**

---

## Étape 3 — Activer Netlify Blobs (persistence multi-appareils)

Netlify Blobs est automatiquement disponible sur les sites Netlify — pas besoin d'installer quoi que ce soit.

La Function `netlify/functions/prog.mjs` gère déjà tout.

**Pour vérifier que ça marche :**
1. Ouvre `/admin.html` sur ton site déployé
2. Entre ton mot de passe
3. Modifie un exercice et clique "Sauvegarder"
4. La barre de statut doit afficher "Sauvegardé avec succès"
5. Recharge `/index.html` → tes modifs doivent apparaître

---

## Utilisation au quotidien

- **Voir la prog** → `https://ton-site.netlify.app/`
- **Modifier la prog** → `https://ton-site.netlify.app/admin.html`

Dans l'admin tu peux :
- ✏️ Renommer un exercice (clique sur le texte)
- 🔢 Changer le nombre de séries
- ➕ Ajouter un exercice dans une section
- ➕ Ajouter une section (groupe musculaire)
- ⠿ Réordonner les exercices par glisser-déposer
- ✕ Supprimer un exercice

---

## Fallback (si la Function n'est pas encore déployée)

Sans la Function, l'admin sauvegarde dans le **localStorage** du navigateur — les modifs ne sont visibles que sur cet appareil. La barre de statut t'indiquera lequel des deux modes est actif.
